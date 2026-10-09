import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { VoiceAssistantHero } from './components/VoiceAssistantHero';
import { ChatHistory } from './components/ChatHistory';
import { ResumeSection } from './components/ResumeSection';
import { ContactModal } from './components/ContactModal';
import { useLiliVoice } from './hooks/useLiliVoice';
import { linaProfile } from './data/linaProfile';
import {
  Sparkles,
  Award,
  Briefcase,
  Compass,
  ArrowUpRight,
  Headphones,
  Check,
} from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showFullResume, setShowFullResume] = useState(true);

  const {
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
    startListening,
    stopListening,
    stopSpeaking,
    sendTextMessage,
    replayMessage,
  } = useLiliVoice({ initialLanguage: 'fr', voiceName: 'Aoede' });

  const handleToggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSelectPrompt = (prompt: string) => {
    sendTextMessage(prompt);
  };

  const scrollToResume = () => {
    const el = document.getElementById('resume-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#24211D] flex flex-col font-sans selection:bg-[#EAE0D0] selection:text-[#1F1C19]">
      {/* Navbar */}
      <Navbar
        language={language}
        setLanguage={setLanguage}
        voiceName={voiceName}
        setVoiceName={setVoiceName}
        isSpeaking={isSpeaking}
        onOpenContact={() => setIsContactOpen(true)}
        onOpenResume={scrollToResume}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* Voice Assistant Hero */}
        <VoiceAssistantHero
          language={language}
          isListening={isListening}
          isSpeaking={isSpeaking}
          isConnected={isConnected}
          isConnecting={isConnecting}
          liveTranscript={liveTranscript}
          error={error}
          onToggleListening={handleToggleListening}
          onStopSpeaking={stopSpeaking}
          onSelectPrompt={handleSelectPrompt}
          onOpenResume={scrollToResume}
        />

        {/* Dual Interactive Zone: Chat Dialogue + Executive Profile Showcase */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Interactive Chat & Audio Timeline */}
            <div className="lg:col-span-7">
              <ChatHistory
                messages={messages}
                language={language}
                isListening={isListening}
                isSpeaking={isSpeaking}
                onSendMessage={sendTextMessage}
                onToggleListening={handleToggleListening}
                onReplayMessage={replayMessage}
              />
            </div>

            {/* Right: Executive Portrait & Quick Voice Query Deck */}
            <div className="lg:col-span-5 space-y-6">
              {/* Executive Snapshot Card */}
              <div className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-7 border border-[#E9E1D3] shadow-xs">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5EDE1] to-[#E9DEC9] border border-[#D8C7A7] flex items-center justify-center text-center shadow-xs">
                    <span className="font-serif-luxury text-2xl font-semibold text-[#3C342C]">
                      LZ
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif-luxury text-2xl font-normal text-[#211E1A]">
                      {linaProfile.name}
                    </h3>
                    <p className="text-xs uppercase tracking-wider text-[#8A7142] font-medium">
                      {language === 'fr'
                        ? 'Candidate en Marketing du Luxe'
                        : 'Luxury Marketing Candidate'}
                    </p>
                    <p className="text-xs text-[#7B7062] mt-0.5">
                      Paris · ESCE Master 2 · Bilingue FR/EN
                    </p>
                  </div>
                </div>

                <div className="border-t border-b border-[#ECE3D5] py-4 my-4 space-y-2.5">
                  <div className="flex items-start gap-2 text-xs text-[#52493E]">
                    <Check className="w-4 h-4 text-[#B68D40] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-medium text-[#26211D]">
                        {language === 'fr' ? 'Recherche :' : 'Looking for:'}
                      </strong>{' '}
                      {language === 'fr'
                        ? 'Stage de 6 mois, CDD ou CDI dès janvier 2027'
                        : '6-Month Internship, Fixed-Term or Permanent starting Jan 2027'}
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#52493E]">
                    <Check className="w-4 h-4 text-[#B68D40] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-medium text-[#26211D]">
                        {language === 'fr' ? 'Expériences phares :' : 'Key Experiences:'}
                      </strong>{' '}
                      Lancel (Galeries Lafayette), SONUP (Alternance), La Baie d’Hudson (Montréal).
                    </span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-[#52493E]">
                    <Check className="w-4 h-4 text-[#B68D40] shrink-0 mt-0.5" />
                    <span>
                      <strong className="font-medium text-[#26211D]">
                        {language === 'fr' ? 'Double compétence :' : 'Dual Competence:'}
                      </strong>{' '}
                      {language === 'fr'
                        ? 'Excellence relationnelle luxe & Maîtrise des outils (Power BI, CRM Sellsy)'
                        : 'Luxury client excellence & Business intelligence (Power BI, Sellsy)'}
                    </span>
                  </div>
                </div>

                {/* Direct Action buttons */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setIsContactOpen(true)}
                    className="flex-1 py-2.5 rounded-full bg-[#29231F] text-[#FAF7F2] hover:bg-[#3D352F] text-xs font-medium uppercase tracking-wider transition-all text-center"
                  >
                    {language === 'fr' ? 'Contacter Lina' : 'Contact Lina'}
                  </button>
                  <button
                    onClick={scrollToResume}
                    className="flex-1 py-2.5 rounded-full bg-white hover:bg-[#F2EBE0] text-[#3E362C] border border-[#DDD3C2] text-xs font-medium uppercase tracking-wider transition-all text-center"
                  >
                    {language === 'fr' ? 'Voir le CV complet' : 'View Full CV'}
                  </button>
                </div>
              </div>

              {/* Voice Prompt Suggestions Box */}
              <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E9E1D3]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-[#B68D40]" />
                    <h4 className="font-serif-luxury text-lg font-medium text-[#26211D]">
                      {language === 'fr'
                        ? 'Questions recommandées pour Lili'
                        : 'Recommended Questions for Lili'}
                    </h4>
                  </div>
                  <span className="text-[11px] text-[#867B6F]">
                    {language === 'fr' ? 'Voix haute fidélité' : 'Hi-Fi Audio'}
                  </span>
                </div>

                <div className="space-y-2">
                  {linaProfile.suggestedQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectPrompt(language === 'fr' ? q.fr : q.en)}
                      className="w-full text-left p-3 rounded-xl bg-white/70 hover:bg-white text-xs text-[#3E362C] border border-[#ECE3D5] hover:border-[#D1B88B] transition-all flex items-center justify-between group"
                    >
                      <span className="line-clamp-1 pr-2 font-light">
                        {language === 'fr' ? q.fr : q.en}
                      </span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#B68D40] opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Full Resume Section */}
        <div id="resume-section">
          <ResumeSection
            language={language}
            onAskLiliAbout={handleSelectPrompt}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#FAF6EF] border-t border-[#EAE1D3] py-10 text-center text-xs text-[#7F7466]">
        <div className="max-w-7xl mx-auto px-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="font-serif-luxury text-lg text-[#2A241F] font-medium tracking-wide">
              Lina Zaki
            </span>
            <span>·</span>
            <span className="text-[#846F46]">
              Lili Voice Assistant (Bilingual FR / EN)
            </span>
          </div>
          <p className="max-w-xl mx-auto text-[#6D6356] font-light">
            {language === 'fr'
              ? 'Ambassadrice vocale officielle conçue pour présenter le profil de Lina Zaki aux maisons de prestige et recruteurs.'
              : 'Official voice assistant designed to present Lina Zaki’s profile to luxury houses and recruiters.'}
          </p>
          <p className="text-[11px] text-[#9D9183]">
            {language === 'fr'
              ? 'Bilingue français (accent parisien) & anglais (accent américain) · Propulsée par Gemini'
              : 'Bilingual French (Parisian accent) & English (American accent) · Powered by Gemini'}
          </p>
        </div>
      </footer>

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        language={language}
        onAskLiliAbout={handleSelectPrompt}
      />
    </div>
  );
}
