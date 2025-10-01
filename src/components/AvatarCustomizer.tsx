import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface AvatarOptions {
  hairstyle: string;
  clothing: string;
  faceShape: string;
  skinTone: string;
  accessories: string;
  hairColor: string;
  clothingColor: string;
  accessoryColor: string;
}

interface AvatarCustomizerProps {
  onSave: (options: AvatarOptions) => void;
  initialOptions?: Partial<AvatarOptions>;
}

const hairstyles = ["Short", "Long", "Wavy", "Curly", "Bald"];
const clothingStyles = ["Casual", "Formal", "Sport", "Hoodie"];
const faceShapes = ["Round", "Oval", "Square", "Heart"];
const skinTones = ["Light", "Medium", "Tan", "Dark"];
const accessoriesOptions = ["None", "Glasses", "Hat", "Earrings"];
const colors = ["Black", "Brown", "Blonde", "Red", "Blue", "Green", "Purple", "Pink"];

export const AvatarCustomizer = ({ onSave, initialOptions = {} }: AvatarCustomizerProps) => {
  const [options, setOptions] = useState<AvatarOptions>({
    hairstyle: initialOptions.hairstyle || "Short",
    clothing: initialOptions.clothing || "Casual",
    faceShape: initialOptions.faceShape || "Round",
    skinTone: initialOptions.skinTone || "Medium",
    accessories: initialOptions.accessories || "None",
    hairColor: initialOptions.hairColor || "Brown",
    clothingColor: initialOptions.clothingColor || "Blue",
    accessoryColor: initialOptions.accessoryColor || "Black",
  });

  const updateOption = (key: keyof AvatarOptions, value: string) => {
    setOptions({ ...options, [key]: value });
  };

  const OptionButtons = ({ 
    label, 
    items, 
    selected, 
    onSelect 
  }: { 
    label: string; 
    items: string[]; 
    selected: string; 
    onSelect: (value: string) => void;
  }) => (
    <div className="space-y-2">
      <Label className="text-card-foreground">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Button
            key={item}
            variant={selected === item ? "default" : "outline"}
            size="sm"
            onClick={() => onSelect(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );

  // Helper to get color value
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

  return (
    <div className="space-y-6">
      {/* Avatar Preview */}
      <div className="flex justify-center">
        <div className="relative w-40 h-40 flex items-end justify-center">
          {/* Face */}
          <div className={`w-28 h-32 ${getSkinToneClass(options.skinTone)} rounded-full relative z-10 flex items-center justify-center shadow-lg`}>
            {/* Eyes */}
            <div className="flex gap-4 mb-4">
              <div className="w-2 h-2 bg-gray-800 rounded-full" />
              <div className="w-2 h-2 bg-gray-800 rounded-full" />
            </div>
          </div>
          
          {/* Hair */}
          {options.hairstyle !== 'Bald' && (
            <div className={`absolute top-0 w-32 h-20 ${getColorClass(options.hairColor)} rounded-t-full z-20`} />
          )}
          
          {/* Clothing */}
          <div className={`absolute bottom-0 w-36 h-16 ${getColorClass(options.clothingColor)} rounded-b-3xl z-0`} />
          
          {/* Accessories */}
          {options.accessories === 'Glasses' && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2 z-30 flex gap-4">
              <div className={`w-6 h-5 ${getColorClass(options.accessoryColor)} rounded-full opacity-40 border-2 border-gray-800`} />
              <div className={`w-6 h-5 ${getColorClass(options.accessoryColor)} rounded-full opacity-40 border-2 border-gray-800`} />
            </div>
          )}
          {options.accessories === 'Hat' && (
            <div className={`absolute -top-4 w-20 h-8 ${getColorClass(options.accessoryColor)} rounded-t-full z-30`} />
          )}
        </div>
      </div>

      <OptionButtons
        label="Hairstyle"
        items={hairstyles}
        selected={options.hairstyle}
        onSelect={(v) => updateOption("hairstyle", v)}
      />

      <OptionButtons
        label="Hair Color"
        items={colors}
        selected={options.hairColor}
        onSelect={(v) => updateOption("hairColor", v)}
      />

      <OptionButtons
        label="Clothing"
        items={clothingStyles}
        selected={options.clothing}
        onSelect={(v) => updateOption("clothing", v)}
      />

      <OptionButtons
        label="Clothing Color"
        items={colors}
        selected={options.clothingColor}
        onSelect={(v) => updateOption("clothingColor", v)}
      />

      <OptionButtons
        label="Face Shape"
        items={faceShapes}
        selected={options.faceShape}
        onSelect={(v) => updateOption("faceShape", v)}
      />

      <OptionButtons
        label="Skin Tone"
        items={skinTones}
        selected={options.skinTone}
        onSelect={(v) => updateOption("skinTone", v)}
      />

      <OptionButtons
        label="Accessories"
        items={accessoriesOptions}
        selected={options.accessories}
        onSelect={(v) => updateOption("accessories", v)}
      />

      {options.accessories !== "None" && (
        <OptionButtons
          label="Accessory Color"
          items={colors}
          selected={options.accessoryColor}
          onSelect={(v) => updateOption("accessoryColor", v)}
        />
      )}

      <Button onClick={() => onSave(options)} className="w-full shadow-glow-blue">
        Save Avatar
      </Button>
    </div>
  );
};