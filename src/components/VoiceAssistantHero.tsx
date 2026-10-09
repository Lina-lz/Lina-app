import React from 'react';
import { Mic, MicOff, Square, Sparkles, Volume2, Globe, ArrowRight } from 'lucide-react';
import { LuxurySoundWave } from './LuxurySoundWave';

interface VoiceAssistantHeroProps {
  language: 'fr' | 'en';
  isListening: boolean;
  isSpeaking: boolean;
  isConnected: boolean;
  isConnecting: boolean;
  liveTranscript: string;
  error: string | null;
  onToggleListening: () => void;
  onStopSpeaking: () => void;
  onSelectPrompt: (prompt: string) => void;
  onOpenResume: () => void;
}

export const VoiceAssistantHero: React.FC<VoiceAssistantHeroProps> = ({
  language,
  isListening,
  isSpeaking,
  isConnected,
  isConnecting,
  liveTranscript,
  error,
  onToggleListening,
  onStopSpeaking,
  onSelectPrompt,
  onOpenResume,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 text-center">
      {/* Subtle luxury ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#EFE5D3]/40 via-[#F7F0E4]/30 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Availability Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F4EDE0] border border-[#DFCFA] text-xs text-[#6B5A3E] font-medium mb-6 tracking-wide shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#B68D40] animate-pulse" />
          <span>
            {language === 'fr'
              ? 'Opportunité recherchée : Stage, CDD ou CDI dès Janvier 2027'
              : 'Target: 6-Month Internship, Fixed-Term or Permanent from Jan 2027'}
          </span>
        </div>

        {/* Headline in Luxury Serif */}
        <h2 className="font-serif-luxury text-4xl sm:text-5xl md:text-6xl font-normal text-[#211E1B] tracking-tight leading-[1.15] mb-4">
          {language === 'fr' ? (
            <>
              « Bonjour, je suis <span className="italic font-light text-[#8A6A2C]">Lili</span>,
              <br className="hidden sm:inline" /> la voix de Lina Zaki. »
            </>
          ) : (
            <>
              “Welcome, I am <span className="italic font-light text-[#8A6A2C]">Lili</span>,
              <br className="hidden sm:inline" /> Lina Zaki’s voice.”
            </>
          )}
        </h2>

        {/* Subtitle / Positioning */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[#61574D] font-light leading-relaxed mb-10">
          {language === 'fr' ? (
            <>
              Assistante vocale bilingue haute précision. Je vous parle de son expertise en{' '}
              <strong className="font-medium text-[#292420]">Marketing du Luxe & Prestige</strong>,{' '}
              de ses expériences chez <span className="text-[#3A332B] font-medium">Lancel</span>,{' '}
              <span className="text-[#3A332B] font-medium">SONUP</span> et au{' '}
              <span className="text-[#3A332B] font-medium">Canada</span>.
            </>
          ) : (
            <>
              Bilingual luxury voice assistant. Discover Lina’s expertise in{' '}
              <strong className="font-medium text-[#292420]">Luxury, Communication & Prestige Marketing</strong>,{' '}
              her achievements at <span className="text-[#3A332B] font-medium">Lancel</span>,{' '}
              <span className="text-[#3A332B] font-medium">SONUP</span>, and across{' '}
              <span className="text-[#3A332B] font-medium">Canada & London</span>.
            </>
          )}
        </p>

        {/* Central Voice Orb & Waveform Container */}
        <div className="relative mx-auto max-w-md bg-[#FFFFFF]/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-[#EAE2D5] shadow-[0_12px_40px_rgba(72,60,40,0.06)] transition-all">
          {/* Accent Badge */}
          <div className="flex items-center justify-between text-xs text-[#7B7266] mb-5 pb-3 border-b border-[#F0E9DF]">
            <span className="flex items-center gap-1.5 font-medium">
              <Globe className="w-3.5 h-3.5 text-[#B68D40]" />
              {language === 'fr'
                ? 'Accent français parisien · Voix féminine'
                : 'American accent · Refined female voice'}
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-[#F7F2E9] text-[#7E6E50] border border-[#E8DDCA]">
              {isConnected ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                  Gemini Live 3.8
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 text-[#B68D40]" />
                  Gemini Flash 3.8
                </>
              )}
            </span>
          </div>

          {/* Sound Wave Visualizer */}
          <LuxurySoundWave
            isActive={isListening || isSpeaking}
            isSpeaking={isSpeaking}
            isListening={isListening}
            accentColor="#B68D40"
          />

          {/* Status Label */}
          <div className="my-4 min-h-[24px]">
            {isListening ? (
              <p className="text-sm font-medium text-[#B68D40] tracking-wider uppercase animate-pulse">
                {language === 'fr' ? 'Lili vous écoute...' : 'Lili is listening to you...'}
              </p>
            ) : isSpeaking ? (
              <p className="text-sm font-medium text-[#7D632F] tracking-wider uppercase">
                {language === 'fr' ? 'Lili s’exprime...' : 'Lili is speaking...'}
              </p>
            ) : isConnecting ? (
              <p className="text-sm text-[#877E73] animate-pulse">
                {language === 'fr' ? 'Connexion en cours...' : 'Connecting...'}
              </p>
            ) : (
              <p className="text-xs uppercase tracking-widest text-[#938A7E]">
                {language === 'fr' ? 'Prête à échanger par la voix' : 'Ready for voice conversation'}
              </p>
            )}
          </div>

          {/* Main Action Buttons */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={onToggleListening}
              className={`group relative flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md ${
                isListening
                  ? 'bg-rose-700 text-white hover:bg-rose-800 ring-4 ring-rose-200/50'
                  : 'bg-[#292420] text-[#FAF7F2] hover:bg-[#3E3731] hover:scale-[1.02] active:scale-[0.98]'
              }`}
            >
              {isListening ? (
                <>
                  <MicOff className="w-4 h-4 animate-bounce" />
                  <span>{language === 'fr' ? 'Arrêter l’écoute' : 'Stop Listening'}</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4 text-[#E6C98D] group-hover:scale-110 transition-transform" />
                  <span>{language === 'fr' ? 'Parler avec Lili' : 'Talk with Lili'}</span>
                </>
              )}
            </button>

            {isSpeaking && (
              <button
                onClick={onStopSpeaking}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-full text-xs font-medium bg-[#F1E9DC] text-[#554A3E] hover:bg-[#E5DBCB] transition-colors border border-[#D9CDBC]"
                title={language === 'fr' ? 'Interrompre Lili' : 'Stop voice'}
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>{language === 'fr' ? 'Silence' : 'Stop'}</span>
              </button>
            )}
          </div>

          {/* Error Message if any */}
          {error && (
            <div className="mt-4 p-2.5 text-xs text-amber-900 bg-amber-50 rounded-lg border border-amber-200">
              {error}
            </div>
          )}

          {/* Live Transcript Streaming Display */}
          {liveTranscript && (
            <div className="mt-5 p-3.5 bg-[#FAF7F2] rounded-xl border border-[#E7DECf] text-left">
              <span className="text-[10px] uppercase tracking-wider text-[#918679] block mb-1">
                {language === 'fr' ? 'Transcription directe :' : 'Live Transcript:'}
              </span>
              <p className="text-sm font-serif-luxury text-[#2C2723] italic leading-relaxed">
                « {liveTranscript} »
              </p>
            </div>
          )}
        </div>

        {/* Quick Topics Pills */}
        <div className="mt-8">
          <p className="text-xs uppercase tracking-widest text-[#897F74] mb-3">
            {language === 'fr' ? 'Ou explorez un sujet clé :' : 'Or explore a key topic:'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              {
                fr: 'Son expérience chez Lancel',
                en: 'Her experience at Lancel',
                prompt:
                  language === 'fr'
                    ? 'Parle-moi de son expérience chez Lancel aux Galeries Lafayette.'
                    : 'Tell me about her experience at Lancel in Galeries Lafayette.',
              },
              {
                fr: 'Ses missions chez SONUP',
                en: 'Her work at SONUP',
                prompt:
                  language === 'fr'
                    ? 'Quelles étaient ses missions en alternance chez SONUP à Paris ?'
                    : 'What were her responsibilities at SONUP in Paris?',
              },
              {
                fr: 'Ses objectifs pour Janvier 2027',
                en: 'Her goals for January 2027',
                prompt:
                  language === 'fr'
                    ? 'Quel type de poste ou stage Lina recherche-t-elle pour janvier 2027 ?'
                    : 'What roles is Lina targeting for January 2027?',
              },
              {
                fr: 'Parcours international & Bilinguisme',
                en: 'International & Languages',
                prompt:
                  language === 'fr'
                    ? 'Parle-moi de son parcours bilingue au Canada et à Londres.'
                    : 'Tell me about her international background in Canada and London.',
              },
            ].map((pill, i) => (
              <button
                key={i}
                onClick={() => onSelectPrompt(pill.prompt)}
                className="text-xs px-3.5 py-1.5 rounded-full bg-[#FAF7F2] hover:bg-[#F2EAE0] text-[#4E463E] hover:text-[#1F1B18] border border-[#E3D9CC] transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                {language === 'fr' ? pill.fr : pill.en}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
