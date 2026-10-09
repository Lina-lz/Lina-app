import React, { useState } from 'react';
import { Mail, Phone, MapPin, X, Copy, Check, Sparkles, Send } from 'lucide-react';
import { linaProfile } from '../data/linaProfile';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'fr' | 'en';
  onAskLiliAbout: (prompt: string) => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  language,
  onAskLiliAbout,
}) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (field: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs transition-opacity animate-fade-in">
      <div className="bg-[#FAF7F2] rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-[#E7DED0] shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#817769] hover:text-[#211E1B] hover:bg-[#EFE8DD] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-[#F2E8D7] border border-[#DFCFA] flex items-center justify-center mx-auto mb-3">
            <span className="font-serif-luxury text-lg font-bold text-[#3B332B]">LZ</span>
          </div>
          <h3 className="font-serif-luxury text-3xl font-normal text-[#211E1B] mb-1">
            {linaProfile.name}
          </h3>
          <p className="text-xs uppercase tracking-widest text-[#85724B] font-medium">
            {language === 'fr'
              ? 'Luxury, Communication & Prestige Marketing'
              : 'Luxury, Communication & Prestige Marketing'}
          </p>
        </div>

        {/* Contact list */}
        <div className="space-y-3 mb-6">
          {/* Email */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 border border-[#ECE3D5]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#F4EDE0] text-[#7A6335]">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#93887B] block font-medium">
                  Email
                </span>
                <a
                  href={`mailto:${linaProfile.email}`}
                  className="text-sm font-medium text-[#292420] hover:text-[#B68D40] transition-colors"
                >
                  {linaProfile.email}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy('email', linaProfile.email)}
              className="p-1.5 rounded-lg text-[#82786B] hover:text-[#25211D] hover:bg-[#F2ECE1] transition-colors"
              title="Copier l’adresse email"
            >
              {copiedField === 'email' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Phone */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-white/80 border border-[#ECE3D5]">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#F4EDE0] text-[#7A6335]">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#93887B] block font-medium">
                  {language === 'fr' ? 'Téléphone' : 'Phone'}
                </span>
                <a
                  href={`tel:${linaProfile.phone}`}
                  className="text-sm font-medium text-[#292420] hover:text-[#B68D40] transition-colors"
                >
                  {linaProfile.phone}
                </a>
              </div>
            </div>
            <button
              onClick={() => handleCopy('phone', linaProfile.phone)}
              className="p-1.5 rounded-lg text-[#82786B] hover:text-[#25211D] hover:bg-[#F2ECE1] transition-colors"
              title="Copier le numéro"
            >
              {copiedField === 'phone' ? (
                <Check className="w-4 h-4 text-emerald-600" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Location */}
          <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/80 border border-[#ECE3D5]">
            <div className="p-2 rounded-xl bg-[#F4EDE0] text-[#7A6335]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#93887B] block font-medium">
                {language === 'fr' ? 'Localisation & Disponibilité' : 'Location & Availability'}
              </span>
              <p className="text-sm font-medium text-[#292420]">
                Paris, France · {language === 'fr' ? 'Disponible dès Janvier 2027' : 'Available Jan 2027'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${linaProfile.email}?subject=Opportunité en Luxury & Prestige Marketing - Lina Zaki`}
            className="w-full text-center py-3 rounded-full bg-[#28231F] hover:bg-[#3D3631] text-[#FAF6F0] text-xs uppercase tracking-wider font-medium transition-all shadow-xs"
          >
            {language === 'fr' ? 'Écrire un email direct à Lina' : 'Direct Email to Lina'}
          </a>

          <button
            onClick={() => {
              onClose();
              onAskLiliAbout(
                language === 'fr'
                  ? 'Quelles sont les disponibilités de Lina pour un entretien ?'
                  : 'What is Lina’s availability for an interview?'
              );
            }}
            className="w-full text-center py-2.5 rounded-full bg-transparent hover:bg-[#F0E8DC] text-[#554C40] text-xs font-medium transition-colors"
          >
            {language === 'fr'
              ? 'Demander à Lili comment planifier un entretien'
              : 'Ask Lili how to schedule an interview'}
          </button>
        </div>
      </div>
    </div>
  );
};
