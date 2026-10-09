import React from 'react';

interface LuxurySoundWaveProps {
  isActive: boolean;
  isSpeaking: boolean;
  isListening: boolean;
  accentColor?: string;
}

export const LuxurySoundWave: React.FC<LuxurySoundWaveProps> = ({
  isActive,
  isSpeaking,
  isListening,
  accentColor = '#B68D40',
}) => {
  const bars = [14, 28, 45, 68, 92, 54, 78, 38, 85, 48, 62, 32, 70, 42, 20];

  return (
    <div className="flex items-center justify-center gap-1.5 h-16 px-4">
      {bars.map((baseHeight, idx) => {
        let heightMultiplier = 0.2;
        let animationDuration = '1.8s';

        if (isSpeaking) {
          heightMultiplier = 0.4 + (Math.sin(idx * 0.9) * 0.5 + 0.5) * 0.7;
          animationDuration = `${0.6 + (idx % 4) * 0.2}s`;
        } else if (isListening) {
          heightMultiplier = 0.3 + (Math.cos(idx * 0.8) * 0.5 + 0.5) * 0.4;
          animationDuration = `${1.2 + (idx % 3) * 0.3}s`;
        } else if (isActive) {
          heightMultiplier = 0.25;
          animationDuration = '2.5s';
        }

        const calculatedHeight = Math.max(6, Math.min(60, baseHeight * heightMultiplier));

        return (
          <div
            key={idx}
            className="w-1 rounded-full transition-all duration-300"
            style={{
              height: `${calculatedHeight}px`,
              backgroundColor: isSpeaking
                ? accentColor
                : isListening
                ? '#5A544C'
                : '#D8CEBE',
              opacity: isActive ? (isSpeaking ? 0.95 : 0.6) : 0.35,
              animation:
                isSpeaking || isListening
                  ? `pulseWave ${animationDuration} ease-in-out infinite alternate`
                  : 'none',
              animationDelay: `${idx * 0.08}s`,
            }}
          />
        );
      })}
    </div>
  );
};
