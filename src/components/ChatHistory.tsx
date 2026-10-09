import React, { useState, useRef, useEffect } from 'react';
import { Send, Volume2, Mic, MicOff, Copy, Check, Sparkles } from 'lucide-react';
import { ChatMessage } from '../hooks/useLiliVoice';

interface ChatHistoryProps {
  messages: ChatMessage[];
  language: 'fr' | 'en';
  isListening: boolean;
  isSpeaking: boolean;
  onSendMessage: (text: string) => void;
  onToggleListening: () => void;
  onReplayMessage: (msg: ChatMessage) => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
  messages,
  language,
  isListening,
  isSpeaking,
  onSendMessage,
  onToggleListening,
  onReplayMessage,
}) => {
  const [inputText, setInputText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    onSendMessage(inputText.trim());
    setInputText('');
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="bg-[#FAF7F2] border border-[#E9E1D4] rounded-3xl overflow-hidden shadow-xs flex flex-col h-[520px]">
      {/* Panel Header */}
      <div className="px-6 py-4 bg-[#F5EDE1]/80 border-b border-[#E7DDCE] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#B68D40]" />
          <h3 className="font-serif-luxury text-lg font-medium text-[#2A2521]">
            {language === 'fr' ? 'Échange avec Lili' : 'Conversation with Lili'}
          </h3>
        </div>
        <span className="text-xs text-[#7F7467] font-light">
          {language === 'fr' ? 'Voix haute fidélité & Texte' : 'High fidelity voice & text'}
        </span>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isLili = msg.sender === 'lili';

          return (
            <div
              key={msg.id}
              className={`flex ${isLili ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-4 transition-all ${
                  isLili
                    ? 'bg-white text-[#292420] border border-[#EBE3D6] shadow-xs'
                    : 'bg-[#2E2824] text-[#FAF7F2] shadow-xs'
                }`}
              >
                {/* Header of message */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] uppercase tracking-wider font-medium ${
                      isLili ? 'text-[#8A6A2C]' : 'text-[#D7CBBA]'
                    }`}
                  >
                    {isLili ? 'Lili (Ambassadrice)' : language === 'fr' ? 'Vous' : 'You'}
                  </span>

                  {isLili && (
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onReplayMessage(msg)}
                        className="p-1 rounded-full text-[#81776A] hover:text-[#B68D40] hover:bg-[#F7F2E8] transition-colors"
                        title={language === 'fr' ? 'Réécouter la voix de Lili' : 'Replay Lili’s voice'}
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleCopy(msg.id, msg.text)}
                        className="p-1 rounded-full text-[#81776A] hover:text-[#231F1C] hover:bg-[#F7F2E8] transition-colors"
                        title={language === 'fr' ? 'Copier le texte' : 'Copy text'}
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* Message body */}
                <p
                  className={`text-sm leading-relaxed ${
                    isLili ? 'font-serif-luxury text-base text-[#2E2824]' : 'font-sans'
                  }`}
                >
                  {msg.text}
                </p>

                {/* Footer time */}
                <div
                  className={`text-[10px] mt-2 text-right ${
                    isLili ? 'text-[#9C9285]' : 'text-[#B8AC9C]'
                  }`}
                >
                  {new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={scrollEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        className="p-3 sm:p-4 bg-white/90 border-t border-[#E8DFD1] flex items-center gap-2"
      >
        <button
          type="button"
          onClick={onToggleListening}
          className={`p-2.5 rounded-full transition-all shrink-0 ${
            isListening
              ? 'bg-rose-700 text-white animate-pulse'
              : 'bg-[#F2ECE1] text-[#5A5147] hover:bg-[#E5DDCF]'
          }`}
          title={isListening ? 'Arrêter le micro' : 'Activer le micro'}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={
            language === 'fr'
              ? 'Posez une question sur le parcours de Lina...'
              : 'Ask a question about Lina’s background...'
          }
          className="flex-1 bg-[#F9F6F0] border border-[#E3D9CB] rounded-full px-4 py-2.5 text-sm text-[#272320] placeholder-[#8F8477] focus:outline-none focus:ring-1 focus:ring-[#B68D40] focus:border-[#B68D40]"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-full bg-[#2B2521] text-[#FAF7F2] hover:bg-[#3F3732] disabled:opacity-30 disabled:hover:bg-[#2B2521] transition-all shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
