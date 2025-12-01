'use client';

import { useState } from 'react';
import { Icon, Input, Label } from './index';

interface Props {
  placeholder?: string;
  label: string;
  secrue?: boolean;
  bottomText?: string;
}

export const MyInput = ({ placeholder, label, secrue = false, bottomText }: Props) => {
  const [view, setView] = useState(secrue);
  const [value, setValue] = useState('');

  return (
    <div>
      <Label htmlFor={label} className="font-normal mb-2 text-md">
        {label}
      </Label>
      <div className="relative">
        <Input
          id={label}
          placeholder={placeholder}
          type={view ? 'password' : ''}
          onChange={(e) => setValue(e.target.value)}
          value={value ?? ''}
        />
        {secrue && (
          <button className="absolute right-4 top-3" type="button" onClick={() => setView(!view)}>
            {view ? 'Show' : 'Hide'}
          </button>
        )}
      </div>
      {bottomText && <p className="mt-2 text-xm text-muted-foreground">{bottomText}</p>}
    </div>
  );
};
