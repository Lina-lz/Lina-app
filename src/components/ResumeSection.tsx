import React, { useState } from 'react';
import { linaProfile } from '../data/linaProfile';
import {
  Briefcase,
  GraduationCap,
  Languages,
  Sparkles,
  Award,
  CheckCircle2,
  Calendar,
  MapPin,
  Volume2,
  Download,
} from 'lucide-react';

interface ResumeSectionProps {
  language: 'fr' | 'en';
  onAskLiliAbout: (topic: string) => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({
  language,
  onAskLiliAbout,
}) => {
  const [activeTab, setActiveTab] = useState<'experiences' | 'formation' | 'skills' | 'profile'>('experiences');

  return (
    <section className="py-12 bg-white/60 border-t border-b border-[#EAE2D5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-[0.25em] text-[#8F7744] font-medium block mb-2">
            {language === 'fr' ? 'Curriculum Vitae d’Excellence' : 'Executive Resume'}
          </span>
          <h3 className="font-serif-luxury text-3xl sm:text-4xl font-normal text-[#24201D] mb-3">
            {language === 'fr' ? 'Parcours & Réalisations' : 'Background & Credentials'}
          </h3>
          <p className="text-sm text-[#6C6357] font-light leading-relaxed">
            {language === 'fr'
              ? 'L’alliance de l’exigence retail haut de gamme, du développement commercial B2B et d’un cursus académique d’excellence en marketing du luxe.'
              : 'The convergence of luxury high-touch retail, B2B business development acumen, and elite academic education in luxury marketing.'}
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-1 sm:gap-2 mb-10 overflow-x-auto pb-2">
          {[
            {
              id: 'experiences',
              labelFr: 'Expériences Professionnelles',
              labelEn: 'Professional Experience',
              icon: Briefcase,
            },
            {
              id: 'formation',
              labelFr: 'Formation & Diplômes',
              labelEn: 'Education & Honors',
              icon: GraduationCap,
            },
            {
              id: 'skills',
              labelFr: 'Compétences & Langues',
              labelEn: 'Skills & Languages',
              icon: Languages,
            },
            {
              id: 'profile',
              labelFr: 'Vision & Objectif 2027',
              labelEn: 'Vision & 2027 Goal',
              icon: Award,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                  isCurrent
                    ? 'bg-[#2B2521] text-[#FAF7F2] shadow-xs'
                    : 'bg-[#F5EFE4] text-[#635A4F] hover:bg-[#EBE2D4] hover:text-[#211E1A]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-[#E6C98D]' : 'text-[#8C7A59]'}`} />
                <span>{language === 'fr' ? tab.labelFr : tab.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'experiences' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {linaProfile.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E9E1D2] hover:border-[#D1B88B] transition-all duration-300 flex flex-col justify-between group shadow-xs hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8F7744] bg-[#F2E8D7] px-2.5 py-1 rounded-full">
                      {language === 'fr' ? exp.type : exp.typeEn}
                    </span>
                    <button
                      onClick={() =>
                        onAskLiliAbout(
                          language === 'fr'
                            ? `Peux-tu m'expliquer en détail ce que Lina a fait chez ${exp.company} ?`
                            : `Could you tell me in detail about Lina’s responsibilities at ${exp.company}?`
                        )
                      }
                      className="text-[#968979] hover:text-[#8F7744] transition-colors p-1"
                      title={language === 'fr' ? 'Écouter l’analyse de Lili' : 'Ask Lili about this'}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="font-serif-luxury text-2xl font-normal text-[#24201D] mb-1">
                    {exp.company}
                  </h4>
                  <p className="text-sm font-medium text-[#4D453C] mb-2">
                    {language === 'fr' ? exp.role : exp.roleEn}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-[#827667] mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#B68D40]" />
                      {language === 'fr' ? exp.period : exp.periodEn}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B68D40]" />
                      {exp.location}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {(language === 'fr' ? exp.highlights : exp.highlightsEn).map(
                      (item, i) => (
                        <li key={i} className="text-xs text-[#52493F] leading-relaxed flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B68D40] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <button
                  onClick={() =>
                    onAskLiliAbout(
                      language === 'fr'
                        ? `Parle-moi de son expérience chez ${exp.company}`
                        : `Tell me about her experience at ${exp.company}`
                    )
                  }
                  className="w-full text-center text-xs uppercase tracking-wider py-2 rounded-xl bg-[#F0E8DC] hover:bg-[#E5DACB] text-[#423A30] font-medium transition-colors"
                >
                  {language === 'fr' ? 'Faire commenter par Lili' : 'Have Lili narrate'}
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'formation' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {linaProfile.education.map((edu, idx) => (
              <div
                key={idx}
                className="bg-[#FAF7F2] rounded-2xl p-6 border border-[#E9E1D2] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <span className="text-xs text-[#8F7744] font-medium tracking-wider uppercase block mb-1">
                    {edu.period}
                  </span>
                  <h4 className="font-serif-luxury text-xl font-normal text-[#24201D] mb-1">
                    {edu.institution}
                  </h4>
                  <p className="text-sm font-medium text-[#4F463D] mb-2">
                    {language === 'fr' ? edu.degree : edu.degreeEn}
                  </p>
                  <p className="text-xs text-[#6F6557] font-light leading-relaxed">
                    {language === 'fr' ? edu.details : edu.detailsEn}
                  </p>
                </div>
                <button
                  onClick={() =>
                    onAskLiliAbout(
                      language === 'fr'
                        ? `Parle-moi de sa formation à ${edu.institution}`
                        : `Tell me about her education at ${edu.institution}`
                    )
                  }
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium bg-[#F0E8DC] text-[#4E4439] hover:bg-[#E4D7C4] transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#B68D40]" />
                  <span>{language === 'fr' ? 'Écouter' : 'Listen'}</span>
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Langues */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E9E1D2]">
              <div className="flex items-center gap-2 mb-4">
                <Languages className="w-5 h-5 text-[#B68D40]" />
                <h4 className="font-serif-luxury text-xl font-medium text-[#26221E]">
                  {language === 'fr' ? 'Profil Linguistique' : 'Languages'}
                </h4>
              </div>
              <div className="space-y-3">
                {linaProfile.languages.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/70 border border-[#ECE4D6]"
                  >
                    <span className="text-sm font-medium text-[#2F2924]">{l.language}</span>
                    <span className="text-xs text-[#836D40] font-medium bg-[#F5EDE0] px-2.5 py-1 rounded-full">
                      {language === 'fr' ? l.level : l.levelEn}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Compétences techniques & Outils */}
            <div className="bg-[#FAF7F2] rounded-3xl p-6 border border-[#E9E1D2]">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#B68D40]" />
                <h4 className="font-serif-luxury text-xl font-medium text-[#26221E]">
                  {language === 'fr' ? 'Expertises & Outils' : 'Expertise & Tools'}
                </h4>
              </div>
              <div className="flex flex-wrap gap-2">
                {linaProfile.technicalSkills.map((s, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-2 rounded-xl bg-white/80 border border-[#ECE4D6] text-[#3E372E] font-medium"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[#EBE3D6]">
                <span className="text-xs uppercase tracking-wider text-[#8A7F71] block mb-2 font-medium">
                  {language === 'fr' ? 'Qualités interpersonnelles :' : 'Interpersonal qualities:'}
                </span>
                <div className="flex flex-wrap gap-2">
                  {linaProfile.softSkills.map((sk, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-[#F3ECE0] text-[#554A3B] border border-[#E2D6C2]"
                    >
                      {language === 'fr' ? sk.fr : sk.en}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-3xl mx-auto bg-[#FAF7F2] rounded-3xl p-8 border border-[#EAE2D4] text-center">
            <span className="w-12 h-12 rounded-full bg-[#F2E7D5] border border-[#D9C6A5] text-[#8F7744] flex items-center justify-center mx-auto mb-4">
              <Award className="w-6 h-6" />
            </span>
            <h4 className="font-serif-luxury text-2xl font-normal text-[#24201D] mb-3">
              {language === 'fr'
                ? 'Objectif Professionnel — Janvier 2027'
                : 'Career Objective — January 2027'}
            </h4>
            <p className="font-serif-luxury text-lg text-[#383129] italic leading-relaxed mb-6 max-w-xl mx-auto">
              « {language === 'fr' ? linaProfile.objective : linaProfile.objectiveEn} »
            </p>
            <p className="text-sm text-[#665D51] font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              {language === 'fr' ? linaProfile.about.fr : linaProfile.about.en}
            </p>

            <button
              onClick={() =>
                onAskLiliAbout(
                  language === 'fr'
                    ? 'Pourquoi Lina est-elle la candidate idéale pour une maison de luxe en janvier 2027 ?'
                    : 'Why is Lina the ideal candidate for a luxury house starting January 2027?'
                )
              }
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#29231F] text-[#FAF7F2] hover:bg-[#3D352F] text-xs uppercase tracking-wider font-medium transition-all shadow-xs"
            >
              <Volume2 className="w-4 h-4 text-[#E6C98D]" />
              <span>
                {language === 'fr'
                  ? 'Écouter la plaidoirie de Lili pour Lina'
                  : 'Listen to Lili’s pitch for Lina'}
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
