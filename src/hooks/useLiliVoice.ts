import { useState, useEffect, useRef, useCallback } from 'react';
import { floatTo16BitPCM, arrayBufferToBase64, LiveAudioPlayer } from '../utils/audioUtils';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'lili';
  text: string;
  audioUrl?: string;
  timestamp: Date;
  language?: 'fr' | 'en';
}

export interface UseLiliVoiceOptions {
  initialLanguage?: 'fr' | 'en';
  voiceName?: string;
}

export function useLiliVoice(options: UseLiliVoiceOptions = {}) {
  const [language, setLanguage] = useState<'fr' | 'en'>(options.initialLanguage || 'fr');
  const [voiceName, setVoiceName] = useState<string>(options.voiceName || 'Aoede');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [liveTranscript, setLiveTranscript] = useState<string>('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [error, setError] = useState<string | null>(null);

  const wsRef = useRef<WebSocket | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const isListeningRef = useRef<boolean>(false);
  const playerRef = useRef<LiveAudioPlayer | null>(null);
  const activeAudioElementRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio player
  useEffect(() => {
    const player = new LiveAudioPlayer();
    player.onStateChange = (playing) => {
      setIsSpeaking(playing);
    };
    playerRef.current = player;

    // Welcome message in initial state
    setMessages([
      {
        id: 'welcome-1',
        sender: 'lili',
        text:
          language === 'fr'
            ? 'Bonjour et bienvenue. Je suis Lili, l’assistante personnelle de Lina Zaki. Je suis à votre disposition pour vous présenter son parcours en marketing du luxe, ses expériences chez Lancel, La Baie d’Hudson et SONUP, ainsi que ses ambitions pour janvier 2027. Que souhaitez-vous découvrir ?'
            : 'Welcome. I am Lili, Lina Zaki’s personal voice assistant. I am delighted to introduce her background in luxury and prestige marketing, her experience at Lancel, Hudson’s Bay, and SONUP, and her aspirations for January 2027. How may I assist you?',
        timestamp: new Date(),
        language,
      },
    ]);

    return () => {
      player.stop();
      disconnectLive();
    };
  }, []);

  // Sync language change with welcome message if fresh
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Connect to Live API WebSocket
  const connectLive = useCallback(async () => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      return;
    }

    try {
      setIsConnecting(true);
      setError(null);

      const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      const wsUrl = `${protocol}//${window.location.host}/live?voice=${voiceName}`;
      const ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        setIsConnected(true);
        setIsConnecting(false);
        console.log('Connected to Lili Live WebSocket');
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          if (data.type === 'ready') {
            console.log('Lili Live Ready');
          } else if (data.type === 'audio' && data.audio) {
            playerRef.current?.playPCMChunk(data.audio);
          } else if (data.type === 'text' && data.text) {
            setLiveTranscript((prev) => {
              const updated = prev ? `${prev} ${data.text}` : data.text;
              return updated;
            });
          } else if (data.type === 'interrupted') {
            playerRef.current?.stop();
            setIsSpeaking(false);
          } else if (data.type === 'turnComplete') {
            setLiveTranscript((current) => {
              if (current.trim()) {
                setMessages((prev) => [
                  ...prev,
                  {
                    id: String(Date.now()),
                    sender: 'lili',
                    text: current.trim(),
                    timestamp: new Date(),
                    language,
                  },
                ]);
              }
              return '';
            });
          } else if (data.type === 'error') {
            console.warn('Live API warning/error:', data.error);
          }
        } catch (e) {
          console.error('Error handling WS message:', e);
        }
      };

      ws.onerror = (e) => {
        console.error('WebSocket error:', e);
        setError('Connexion audio en direct indisponible. Mode vocal interactif actif.');
        setIsConnecting(false);
      };

      ws.onclose = () => {
        setIsConnected(false);
        setIsConnecting(false);
      };

      wsRef.current = ws;
    } catch (err: any) {
      console.error('Failed to connect to Live API:', err);
      setError(err?.message || 'Erreur lors de la connexion en direct');
      setIsConnecting(false);
    }
  }, [voiceName, language]);

  // Start microphone recording
  const startListening = useCallback(async () => {
    try {
      setError(null);

      // Stop any current audio playback before listening
      stopSpeaking();

      // Ensure WebSocket is connected for real-time live mode
      if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
        await connectLive();
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          sampleRate: 16000,
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
        },
      });

      mediaStreamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx({ sampleRate: 16000 });
      audioContextRef.current = audioCtx;

      const source = audioCtx.createMediaStreamSource(stream);
      // Buffer size 4096 gives ~256ms chunk at 16kHz
      const processor = audioCtx.createScriptProcessor(4096, 1, 1);
      processorRef.current = processor;

      source.connect(processor);
      processor.connect(audioCtx.destination);

      isListeningRef.current = true;
      setIsListening(true);

      processor.onaudioprocess = (e) => {
        if (!isListeningRef.current) return;
        const channelData = e.inputBuffer.getChannelData(0);
        const pcm16 = floatTo16BitPCM(channelData);
        const base64 = arrayBufferToBase64(pcm16);

        if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'audio', audio: base64 }));
        }
      };
    } catch (micErr: any) {
      console.error('Microphone access error:', micErr);
      setError(
        language === 'fr'
          ? 'Accès au microphone requis pour la conversation vocale.'
          : 'Microphone access is needed for live voice conversation.'
      );
      setIsListening(false);
      isListeningRef.current = false;
    }
  }, [connectLive, language]);

  // Stop microphone recording
  const stopListening = useCallback(() => {
    isListeningRef.current = false;
    setIsListening(false);

    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }

    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }
  }, []);

  // Stop Lili speaking
  const stopSpeaking = useCallback(() => {
    playerRef.current?.stop();
    if (activeAudioElementRef.current) {
      activeAudioElementRef.current.pause();
      activeAudioElementRef.current.currentTime = 0;
      activeAudioElementRef.current = null;
    }
    setIsSpeaking(false);
  }, []);

  // Disconnect Live WebSocket
  const disconnectLive = useCallback(() => {
    stopListening();
    stopSpeaking();
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setIsConnected(false);
  }, [stopListening, stopSpeaking]);

  // Play audio from base64 WAV string
  const playBase64Audio = useCallback((base64: string) => {
    try {
      stopSpeaking();
      const audioUrl = `data:audio/wav;base64,${base64}`;
      const audio = new Audio(audioUrl);
      activeAudioElementRef.current = audio;

      audio.onplay = () => setIsSpeaking(true);
      audio.onended = () => {
        setIsSpeaking(false);
        activeAudioElementRef.current = null;
      };
      audio.onerror = () => {
        setIsSpeaking(false);
        activeAudioElementRef.current = null;
      };

      audio.play().catch((err) => {
        console.warn('Playback error:', err);
        setIsSpeaking(false);
      });
    } catch (e) {
      console.error('Audio playback failed:', e);
    }
  }, [stopSpeaking]);

  // Send message via HTTP API (guaranteed speech with gemini-3.8-flash & tts)
  const sendTextMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: ChatMessage = {
        id: String(Date.now()),
        sender: 'user',
        text: text.trim(),
        timestamp: new Date(),
        language,
      };

      setMessages((prev) => [...prev, userMsg]);
      setError(null);

      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: text.trim(),
            history: messages.slice(-5).map((m) => ({
              role: m.sender === 'user' ? 'user' : 'model',
              text: m.text,
            })),
            language,
            voice: voiceName,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Erreur lors de la génération de réponse');
        }

        const replyMsg: ChatMessage = {
          id: String(Date.now() + 1),
          sender: 'lili',
          text: data.replyText,
          audioUrl: data.audioBase64 ? `data:audio/wav;base64,${data.audioBase64}` : undefined,
          timestamp: new Date(),
          language,
        };

        setMessages((prev) => [...prev, replyMsg]);

        if (data.audioBase64) {
          playBase64Audio(data.audioBase64);
        }
      } catch (err: any) {
        console.error('Error sending message:', err);
        setError(err?.message || 'Impossible de joindre Lili pour le moment.');
      }
    },
    [messages, language, voiceName, playBase64Audio]
  );

  // Play audio for a specific past message
  const replayMessage = useCallback(
    async (msg: ChatMessage) => {
      if (msg.audioUrl) {
        stopSpeaking();
        const audio = new Audio(msg.audioUrl);
        activeAudioElementRef.current = audio;
        audio.onplay = () => setIsSpeaking(true);
        audio.onended = () => {
          setIsSpeaking(false);
          activeAudioElementRef.current = null;
        };
        audio.play().catch(() => setIsSpeaking(false));
      } else {
        // Request TTS from server
        try {
          const res = await fetch('/api/tts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              text: msg.text,
              voice: voiceName,
              language: msg.language || language,
            }),
          });
          const data = await res.json();
          if (data.audioBase64) {
            playBase64Audio(data.audioBase64);
          }
        } catch (e) {
          console.error('Replay TTS failed:', e);
        }
      }
    },
    [voiceName, language, playBase64Audio, stopSpeaking]
  );

  return {
    language,
    setLanguage,
    voiceName,
    setVoiceName,
    isConnected,
    isConnecting,
    isListening,
    isSpeaking,
    liveTranscript,
    messages,
    error,
    connectLive,
    disconnectLive,
    startListening,
    stopListening,
    stopSpeaking,
    sendTextMessage,
    replayMessage,
  };
}
