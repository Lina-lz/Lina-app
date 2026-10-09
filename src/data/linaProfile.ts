export interface Experience {
  company: string;
  role: string;
  roleEn: string;
  location: string;
  period: string;
  periodEn: string;
  type: string;
  typeEn: string;
  highlights: string[];
  highlightsEn: string[];
}

export interface Education {
  institution: string;
  degree: string;
  degreeEn: string;
  period: string;
  details?: string;
  detailsEn?: string;
}

export interface LinaProfile {
  name: string;
  assistantName: string;
  title: string;
  titleEn: string;
  tagline: string;
  taglineEn: string;
  objective: string;
  objectiveEn: string;
  email: string;
  phone: string;
  location: string;
  languages: { language: string; level: string; levelEn: string }[];
  softSkills: { fr: string; en: string }[];
  technicalSkills: string[];
  experiences: Experience[];
  education: Education[];
  about: { fr: string; en: string };
  suggestedQuestions: { fr: string; en: string; topic: string }[];
}

export const linaProfile: LinaProfile = {
  name: 'Lina Zaki',
  assistantName: 'Lili',
  title: 'Luxury, Communication & Prestige Marketing',
  titleEn: 'Luxury, Communication & Prestige Marketing',
  tagline: 'Ambassadrice de marque & experte en marketing du luxe',
  taglineEn: 'Brand Ambassador & Luxury Marketing Specialist',
  objective:
    'À la recherche d’un stage de 6 mois, d’un CDD ou d’un CDI en Luxury, Communication & Prestige Marketing à partir de janvier 2027.',
  objectiveEn:
    'Seeking a 6-month internship, fixed-term contract (CDD), or permanent contract (CDI) in Luxury, Communication & Prestige Marketing starting from January 2027.',
  email: 'linazl1802@gmail.com',
  phone: '+33 6 16 84 79 18',
  location: 'Paris, France',
  about: {
    fr: "Étudiante en Master 2 Luxury, Communication & Prestige Marketing à l'ESCE Paris. Passionnée par l'univers du luxe et la communication de marque, dotée d'une solide expérience terrain au sein de grandes enseignes prestigieuses telles que Lancel aux Galeries Lafayette et La Baie d'Hudson à Montréal, complétée par une année d'alternance en business development chez SONUP.",
    en: "Master's student in Luxury, Communication & Prestige Marketing at ESCE Paris. Passionate about luxury houses and brand storytelling, with prestigious retail advisory experience at Lancel in Galeries Lafayette Paris and Hudson's Bay in Montreal, backed by a business development work-study at SONUP.",
  },
  languages: [
    { language: 'Français', level: 'Bilingue / Langue d’usage', levelEn: 'Bilingual / Native fluency' },
    { language: 'Anglais', level: 'Bilingue (accent américain)', levelEn: 'Bilingual (American accent)' },
    { language: 'Arabe', level: 'Langue maternelle', levelEn: 'Mother tongue' },
    { language: 'Espagnol', level: 'Débutant', levelEn: 'Beginner' },
  ],
  softSkills: [
    { fr: 'Dynamisme & Proactivité', en: 'Dynamic & Proactive' },
    { fr: 'Excellent relationnel & Sens du contact', en: 'Exceptional Interpersonal Skills' },
    { fr: 'Orientation client & Exigence luxe', en: 'High-Touch Client Orientation' },
    { fr: 'Négociation & Force de conviction', en: 'Strategic Negotiation & Persuasion' },
    { fr: 'Curiosité & Sensibilité esthétique', en: 'Creativity & Aesthetic Sensitivity' },
  ],
  technicalSkills: [
    'Marketing du Luxe & Storytelling',
    'Power BI & Analyse de données',
    'CRM Sellsy & Fidélisation',
    'Merchandising & Visual Standards',
    'Microsoft Office (Excel, PPT)',
    'Gestion de projet Trello',
  ],
  experiences: [
    {
      company: 'SONUP',
      role: 'Business Developer (Alternance)',
      roleEn: 'Business Developer (Work-Study)',
      location: 'Paris, France',
      period: 'Oct 2024 – Oct 2025',
      periodEn: 'Oct 2024 – Oct 2025',
      type: 'Alternance',
      typeEn: 'Work-Study Apprenticeship',
      highlights: [
        'Gestion quotidienne et optimisation du CRM pour le suivi des opportunités',
        'Développement actif et qualification d’un portefeuille de clients stratégiques',
        'Participation directe aux rendez-vous clients, aux présentations et aux négociations commerciales',
      ],
      highlightsEn: [
        'Daily CRM management and pipeline optimization for B2B client acquisition',
        'Active prospecting and qualification of high-value business leads',
        'Direct participation in client meetings, executive pitches, and contract negotiations',
      ],
    },
    {
      company: 'LANCEL',
      role: 'Conseillère de Vente (Stage)',
      roleEn: 'Luxury Sales Advisor (Internship)',
      location: 'Galeries Lafayette, Paris',
      period: 'Juin 2024 – Août 2024',
      periodEn: 'June 2024 – Aug 2024',
      type: 'Stage Luxe',
      typeEn: 'Luxury Retail Internship',
      highlights: [
        'Accueil VIP et conseil personnalisé auprès d’une clientèle internationale exigeante',
        'Maîtrise du cérémonial de vente et du storytelling maroquinier haut de gamme pour conclure les ventes',
        'Entretien rigoureux et contrôle des normes de merchandising de la maison',
      ],
      highlightsEn: [
        'High-touch VIP consultation for discerning French and international luxury clientele',
        'Mastery of luxury sales ceremony and leather goods heritage storytelling to drive conversions',
        'Rigorous visual merchandising maintenance ensuring prestigious brand standards',
      ],
    },
    {
      company: 'La Baie d’Hudson (Hudson’s Bay)',
      role: 'Associée à la Vente (Mode, Parfums & Cosmétiques)',
      roleEn: 'Retail Sales Associate (Fashion, Fragrance & Beauty)',
      location: 'Montréal, Canada',
      period: 'Déc 2021 – Avril 2023',
      periodEn: 'Dec 2021 – Apr 2023',
      type: 'Expérience Internationale',
      typeEn: 'International Retail Experience',
      highlights: [
        'Conseil et vente de vêtements, sacs de luxe, parfums et cosmétiques en grand magasin',
        'Certificat de performance obtenu pour la promotion et la vente de cartes de crédit Mastercard à Montréal',
        'Pratique quotidienne du bilinguisme français/anglais avec la clientèle canadienne et internationale',
      ],
      highlightsEn: [
        'Advising customers on high-end fashion, luxury leather bags, prestige perfumes, and beauty lines',
        'Awarded Certificate of Performance for outstanding Mastercard credit promotion in Montreal',
        'Full bilingual French/English customer engagement across diverse North American clientele',
      ],
    },
  ],
  education: [
    {
      institution: 'ESCE Paris (International Business School)',
      degree: 'Master 2 en Luxury, Communication & Prestige Marketing',
      degreeEn: "Master's in Luxury, Communication & Prestige Marketing",
      period: '2023 – 2027',
      details:
        'Master 1 & 2 spécialisés Luxe & Prestige. Programme d’échange académique à Londres. Réalisation d’un projet de recherche sur les défis managériaux dans les environnements d’affaires en transformation.',
      detailsEn:
        'M1 & M2 specialization in Luxury & Prestige Marketing. Academic exchange term in London. Research project on managerial challenges in transforming business environments.',
    },
    {
      institution: 'HEC Montréal',
      degree: 'Bachelor Bilingue en Administration des Affaires (BAA)',
      degreeEn: 'Bilingual Bachelor of Business Administration (BBA Preparatory)',
      period: '2019 – 2022',
      details: '1ère année bachelor bilingue en administration des affaires avec année préparatoire.',
      detailsEn: '1st year bilingual business administration program with preparatory year at prestigious HEC Montreal.',
    },
    {
      institution: 'Baccalauréat International',
      degree: 'Diplôme du Baccalauréat International (IB)',
      degreeEn: 'International Baccalaureate Diploma (IB)',
      period: '2019',
      details: 'Formation pluridisciplinaire d’excellence avec rigueur académique internationale.',
      detailsEn: 'Prestigious international high-school diploma emphasizing cross-cultural academic excellence.',
    },
  ],
  suggestedQuestions: [
    {
      fr: 'Peux-tu te présenter et me parler de Lina ?',
      en: 'Could you introduce yourself and tell me about Lina?',
      topic: 'intro',
    },
    {
      fr: 'Quelle est son expérience chez Lancel aux Galeries Lafayette ?',
      en: 'Tell me about her experience at Lancel in Galeries Lafayette.',
      topic: 'lancel',
    },
    {
      fr: 'Quelles opportunités Lina recherche-t-elle pour 2027 ?',
      en: 'What career opportunities is Lina seeking for 2027?',
      topic: 'objective',
    },
    {
      fr: 'Parle-moi de son parcours international au Canada et à Londres.',
      en: 'Tell me about her international background in Canada and London.',
      topic: 'international',
    },
    {
      fr: 'Quelles sont ses compétences clés en marketing du luxe ?',
      en: 'What are her key skills in luxury marketing & CRM?',
      topic: 'skills',
    },
    {
      fr: 'Comment puis-je contacter Lina ou planifier un entretien ?',
      en: 'How can I contact Lina or schedule an interview?',
      topic: 'contact',
    },
  ],
};
