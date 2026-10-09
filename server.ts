import express from 'express';
import http from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, Modality, type LiveServerMessage } from '@google/genai';
import { linaProfile } from './src/data/linaProfile.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json({ limit: '15mb' }));

const server = http.createServer(app);
const wss = new WebSocketServer({ server, path: '/live' });

// Initialize Gemini client with standard User-Agent header
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export const LILI_SYSTEM_INSTRUCTION = `
You are Lili, the sophisticated digital voice assistant and ambassador representing Lina Zaki.
You speak with an elegant, polished, confident, and warm tone appropriate for high-end luxury houses (such as Lancel, Chanel, Cartier, Dior, Hermès, LVMH, Kering).

Voice & Language guidelines:
- You speak English and French with a refined female voice tone.
- When speaking in English: articulate with an authentic, clear American accent.
- When speaking in French: speak with an authentic, chic Parisian French accent.
- Always respond in the language used by the interlocutor (French or English). If they greet you in French, answer in French. If they greet you in English, answer in English.
- Your answers are meant to be heard aloud: keep them natural, rhythmic, and concise (typically 2 to 4 sentences), without markdown formatting like asterisks or bullet signs that sound jarring when read aloud.

Key Facts about Lina Zaki:
- Position Sought: 6-month internship, CDD, or CDI in "Luxury, Communication & Prestige Marketing" starting January 2027.
- Education:
  * ESCE International Business School Paris (2023-2027): Master 2 and Master 1 in Luxury, Communication & Prestige Marketing. Academic exchange term in London. Research project on managerial challenges in business transformation.
  * HEC Montréal (2019-2022): Bilingual Bachelor of Business Administration (BAA preparatory).
  * International Baccalaureate (IB) Diploma (2019).
- Professional Experiences:
  * SONUP, Paris (Oct 2024 - Oct 2025): Business Developer (Alternance / Work-Study). CRM management (Sellsy), B2B client portfolio development, client meetings, negotiations.
  * LANCEL, Galeries Lafayette Paris (June 2024 - August 2024): Luxury Sales Advisor (Stage). High-touch VIP customer service, leather goods heritage storytelling, visual merchandising compliance.
  * La Baie d'Hudson, Montreal Canada (Dec 2021 - April 2023): Sales Associate in fashion, luxury handbags, fragrances, and beauty. Awarded Certificate of Performance for Mastercard credit card sales in Montreal.
- Languages: Bilingual French & English, Arabic (native), Spanish (beginner).
- Key Strengths: Dynamic, exceptional interpersonal communication, customer-centric luxury mindset, negotiation skills, Power BI, Sellsy CRM, Trello, MS Office.
- Contact: Email linazl1802@gmail.com, Phone +33 6 16 84 79 18, based in Paris with Canadian international background.

Mission:
Introduce Lina Zaki enthusiastically and professionally to luxury recruiters and brand directors, share her achievements, explain her fit for prestige marketing positions, and encourage contacting her.
`;

// API route to get Lina's complete profile
app.get('/api/profile', (_req, res) => {
  res.json({ success: true, profile: linaProfile });
});

// API route for chat conversation + audio generation
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], language = 'fr', voice = 'Aoede' } = req.body;

    if (!message || typeof message !== 'string') {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    if (!apiKey) {
      res.status(500).json({
        error: 'GEMINI_API_KEY is not configured on the server.',
      });
      return;
    }

    // Build chat contents
    const contents: any[] = [];

    // Add recent history if provided
    for (const h of history.slice(-6)) {
      if (h.role && h.text) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.text }],
        });
      }
    }

    // Add current user prompt
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    // Generate text response with gemini-3.8-flash
    const textResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents,
      config: {
        systemInstruction: LILI_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const replyText = textResponse.text || "Bonjour, je suis Lili, l'assistante de Lina Zaki. Comment puis-je vous aider ?";

    // Generate speech using gemini-3.8-flash-lite-tts
    let audioBase64: string | null = null;
    try {
      const ttsResponse = await ai.models.generateContent({
        model: 'gemini-3.8-flash-lite-tts',
        contents: [
          {
            role: 'user',
            parts: [
              {
                text: replyText,
                speechMetadata: {
                  style: language === 'en'
                    ? 'Sophisticated luxury brand ambassador, articulate American accent, warm and poised'
                    : 'Ambassadrice de luxe raffinée, accent français parisien élégant, chaleureuse et posée',
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: voice || 'Aoede' },
            },
          },
        },
      });

      audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    } catch (ttsErr) {
      console.warn('TTS generation notice:', ttsErr);
      // Still return replyText even if TTS encounters rate limits
    }

    res.json({
      success: true,
      replyText,
      audioBase64,
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({ error: err?.message || 'Failed to process chat message' });
  }
});

// API route for standalone Text-to-Speech
app.post('/api/tts', async (req, res) => {
  try {
    const { text, voice = 'Aoede', language = 'fr' } = req.body;

    if (!text || typeof text !== 'string') {
      res.status(400).json({ error: 'Text is required' });
      return;
    }

    const ttsResponse = await ai.models.generateContent({
      model: 'gemini-3.8-flash-lite-tts',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text,
              speechMetadata: {
                style: language === 'en'
                  ? 'Sophisticated luxury brand ambassador, articulate American accent'
                  : 'Ambassadrice de luxe raffinée, accent français élégant',
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: voice || 'Aoede' },
          },
        },
      },
    });

    const audioBase64 = ttsResponse.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!audioBase64) {
      res.status(500).json({ error: 'No audio returned' });
      return;
    }

    res.json({ success: true, audioBase64 });
  } catch (err: any) {
    console.error('Error in /api/tts:', err);
    res.status(500).json({ error: err?.message || 'Failed to generate speech' });
  }
});

// WebSocket Live API connection handler using gemini-3.8-live
wss.on('connection', async (clientWs: WebSocket, req) => {
  console.log('Client connected to Live API WebSocket');

  let session: any = null;
  let isClosing = false;

  try {
    const searchParams = new URL(req.url || '', `http://${req.headers.host}`).searchParams;
    const requestedVoice = searchParams.get('voice') || 'Aoede';

    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: requestedVoice },
          },
        },
        systemInstruction: LILI_SYSTEM_INSTRUCTION,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          if (clientWs.readyState !== WebSocket.OPEN) return;

          // Check for audio data chunk
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio) {
            clientWs.send(JSON.stringify({ type: 'audio', audio }));
          }

          // Check for model speech transcription or text part
          const parts = message.serverContent?.modelTurn?.parts || [];
          for (const p of parts) {
            if (p.text) {
              clientWs.send(JSON.stringify({ type: 'text', text: p.text }));
            }
          }

          // Check if interrupted by user voice
          if (message.serverContent?.interrupted) {
            clientWs.send(JSON.stringify({ type: 'interrupted' }));
          }

          // Check if turn finished
          if (message.serverContent?.turnComplete) {
            clientWs.send(JSON.stringify({ type: 'turnComplete' }));
          }
        },
        onerror: (error: any) => {
          console.error('Gemini Live session error:', error);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', error: String(error?.message || error) }));
          }
        },
        onclose: () => {
          console.log('Gemini Live session closed');
          if (clientWs.readyState === WebSocket.OPEN && !isClosing) {
            clientWs.send(JSON.stringify({ type: 'closed' }));
          }
        },
      },
    });

    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'ready', message: 'Lili Live connection established' }));
    }

    clientWs.on('message', (raw) => {
      if (!session) return;
      try {
        const payload = JSON.parse(raw.toString());
        if (payload.type === 'audio' && payload.audio) {
          // PCM 16kHz audio from client
          session.sendRealtimeInput({
            audio: {
              data: payload.audio,
              mimeType: 'audio/pcm;rate=16000',
            },
          });
        } else if (payload.type === 'text' && payload.text) {
          session.sendRealtimeInput({
            text: payload.text,
          });
        }
      } catch (err) {
        console.error('Error parsing client WS message:', err);
      }
    });

    clientWs.on('close', () => {
      isClosing = true;
      try {
        if (session && typeof session.close === 'function') {
          session.close();
        }
      } catch (e) {
        // ignore on clean close
      }
    });

    clientWs.on('error', (err) => {
      console.error('Client WebSocket error:', err);
    });
  } catch (connErr: any) {
    console.error('Failed to connect to Live API:', connErr);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(
        JSON.stringify({
          type: 'error',
          error: `Could not initialize Gemini Live API: ${connErr?.message || connErr}`,
        })
      );
    }
  }
});

// Mount Vite middleware in development or static dist in production
const isProd = process.env.NODE_ENV === 'production';
if (!isProd) {
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });
  app.use(vite.middlewares);
} else {
  app.use(express.static(path.resolve(__dirname, 'dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
}

const PORT = Number(process.env.PORT) || 3000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Lili Voice Assistant server running on port ${PORT}`);
});
