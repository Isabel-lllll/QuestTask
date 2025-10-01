interface CustomAvatarDisplayProps {
  hairstyle: string;
  hairColor: string;
  skinTone: string;
  clothingColor: string;
  accessories: string;
  accessoryColor: string;
  size?: 'sm' | 'md' | 'lg';
}

export const CustomAvatarDisplay = ({
  hairstyle,
  hairColor,
  skinTone,
  clothingColor,
  accessories,
  accessoryColor,
  size = 'md'
}: CustomAvatarDisplayProps) => {
  const getColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      Black: 'bg-gray-900',
      Brown: 'bg-amber-800',
      Blonde: 'bg-yellow-300',
      Red: 'bg-red-600',
      Blue: 'bg-blue-500',
      Green: 'bg-green-500',
      Purple: 'bg-purple-500',
      Pink: 'bg-pink-400',
    };
    return colorMap[color] || 'bg-gray-500';
  };

  const getSkinToneClass = (tone: string) => {
    const toneMap: Record<string, string> = {
      Light: 'bg-amber-100',
      Medium: 'bg-amber-200',
      Tan: 'bg-amber-400',
      Dark: 'bg-amber-700',
    };
    return toneMap[tone] || 'bg-amber-200';
  };

  const sizeClasses = {
    sm: { container: 'w-16 h-16', face: 'w-11 h-12', hair: 'w-12 h-8', clothing: 'w-14 h-6', eye: 'w-1 h-1', glasses: 'w-2 h-2', hat: 'w-8 h-3' },
    md: { container: 'w-24 h-24', face: 'w-16 h-20', hair: 'w-18 h-12', clothing: 'w-20 h-10', eye: 'w-1.5 h-1.5', glasses: 'w-4 h-3', hat: 'w-12 h-5' },
    lg: { container: 'w-32 h-32', face: 'w-22 h-26', hair: 'w-24 h-16', clothing: 'w-28 h-12', eye: 'w-2 h-2', glasses: 'w-5 h-4', hat: 'w-16 h-6' },
  };

  const s = sizeClasses[size];

  return (
    <div className={`relative ${s.container} flex items-end justify-center`}>
      {/* Face */}
      <div className={`${s.face} ${getSkinToneClass(skinTone)} rounded-full relative z-10 flex items-center justify-center shadow-lg`}>
        {/* Eyes */}
        <div className="flex gap-2 mb-2">
          <div className={`${s.eye} bg-gray-800 rounded-full`} />
          <div className={`${s.eye} bg-gray-800 rounded-full`} />
        </div>
      </div>
      
      {/* Hair */}
      {hairstyle !== 'Bald' && (
        <div className={`absolute top-0 ${s.hair} ${getColorClass(hairColor)} rounded-t-full z-20`} />
      )}
      
      {/* Clothing */}
      <div className={`absolute bottom-0 ${s.clothing} ${getColorClass(clothingColor)} rounded-b-3xl z-0`} />
      
      {/* Accessories */}
      {accessories === 'Glasses' && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1 z-30 flex gap-2">
          <div className={`${s.glasses} ${getColorClass(accessoryColor)} rounded-full opacity-40 border border-gray-800`} />
          <div className={`${s.glasses} ${getColorClass(accessoryColor)} rounded-full opacity-40 border border-gray-800`} />
        </div>
      )}
      {accessories === 'Hat' && (
        <div className={`absolute -top-2 ${s.hat} ${getColorClass(accessoryColor)} rounded-t-full z-30`} />
      )}
    </div>
  );
};
