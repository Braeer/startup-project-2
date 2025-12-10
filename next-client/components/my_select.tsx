'use client';
import { Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './index';

type Props = {
  onValueChange: (value: string) => void;
  label: string;
  placeholder: string;
  variants: string[];
  value?: string;
};

export const MySelect = ({ value, label, placeholder, variants, onValueChange }: Props) => {
  const toUpFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="mx-auto max-w-[700px] mt-6">
      <Label className="text-text-black text-lg mb-2">{label}</Label>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent popover="manual">
          {variants.map((v, index) => (
            <SelectItem key={index} value={v}>
              {toUpFirstLetter(v)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
