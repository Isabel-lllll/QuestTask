import { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { User } from "lucide-react";

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
            className={selected !== item ? "text-[#0047AB]" : ""}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Avatar Preview */}
      <div className="flex justify-center">
        <div className="w-32 h-32 bg-gradient-card rounded-full flex items-center justify-center shadow-glow-purple">
          <User className="w-16 h-16 text-white" />
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