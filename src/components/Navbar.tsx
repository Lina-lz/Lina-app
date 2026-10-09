import React from 'react';
import { Volume2, Sparkles, Globe, Phone, Mail, Award } from 'lucide-react';

interface NavbarProps {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  voiceName: string;
  setVoiceName: (voice: string) => void;
  isSpeaking: boolean;
  onOpenContact: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  language,
  setLanguage,
  voiceName,
  setVoiceName,
  isSpeaking,
  onOpenContact,
  onOpenResume,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#EAE3D6] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Name */}
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full border border-[#B68D40]/50 bg-[#F5EDE0] flex items-center justify-center shadow-xs">
            <span className="font-serif-luxury text-lg font-semibold tracking-wider text-[#3D352E]">
              LZ
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif-luxury text-xl sm:text-2xl font-normal tracking-wide text-[#23201D]">
                Lina Zaki
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] uppercase tracking-widest bg-[#EFE7D8] text-[#705C35] font-medium border border-[#DFD3BE]">
                Lili AI
              </span>
            </div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#82786D] font-light">
              {language === 'fr'
                ? 'Luxury, Communication & Prestige Marketing'
                : 'Luxury, Communication & Prestige Marketing'}
            </p>
          </div>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Speaking Indicator */}
          {isSpeaking && (
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F3E9D2] border border-[#DBC498] text-xs text-[#846322] animate-pulse">
              <Volume2 className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Lili s’exprime' : 'Lili speaking'}</span>
            </div>
          )}

          {/* Voice Character Select */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs text-[#6F675C] bg-[#F4EFE6] px-2.5 py-1.5 rounded-lg border border-[#E4DCce]">
            <Sparkles className="w-3.5 h-3.5 text-[#B68D40]" />
            <select
              value={voiceName}
              onChange={(e) => setVoiceName(e.target.value)}
              className="bg-transparent border-none text-xs text-[#3D352E] font-medium focus:outline-none cursor-pointer"
            >
              <option value="Aoede">Aoede · Voix Haute Élégance</option>
              <option value="Kore">Kore · Voix Chaleureuse & Diplomate</option>
              <option value="Zephyr">Zephyr · Voix Douce & Poétique</option>
            </select>
          </div>

          {/* Language Switch */}
          <div className="flex items-center bg-[#F0EAE0] p-0.5 rounded-full border border-[#DFD5C4] text-xs">
            <button
              onClick={() => setLanguage('fr')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                language === 'fr'
                  ? 'bg-[#2B2623] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6F665C] hover:text-[#23201D]'
              }`}
              title="Français (Accent Français Élégant)"
            >
              FR
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-full font-medium transition-all ${
                language === 'en'
                  ? 'bg-[#2B2623] text-[#FAF7F2] shadow-xs'
                  : 'text-[#6F665C] hover:text-[#23201D]'
              }`}
              title="English (American Accent)"
            >
              EN
            </button>
          </div>

          {/* Nav Links */}
          <button
            onClick={onOpenResume}
            className="hidden sm:flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium text-[#4A423B] hover:text-[#181614] px-3 py-1.5 rounded-md hover:bg-[#EFE8DD] transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-[#B68D40]" />
            {language === 'fr' ? 'Curriculum' : 'Resume'}
          </button>

          <button
            onClick={onOpenContact}
            className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium bg-[#2C2723] text-[#FAF6F0] hover:bg-[#3F3833] px-3.5 py-2 rounded-full transition-all shadow-xs"
          >
            <Mail className="w-3.5 h-3.5 text-[#E6C98D]" />
            <span>{language === 'fr' ? 'Contact' : 'Contact'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
