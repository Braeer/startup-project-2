'use client';

import { useState } from 'react';
import { Icon, Input, Label } from './index';
import { cn } from '@/lib';

interface Props {
  placeholder?: string;
  label: string;
  secrue?: boolean;
  success?: boolean;
  error?: string;
}

export const MyInput = ({
  placeholder,
  label,
  secrue = false,
  success,
  error,
  ...props
}: Props) => {
  const [view, setView] = useState(secrue);
  // const [value, setValue] = useState('');

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
          // onChange={(e) => setValue(e.target.value)}
          // value={value ?? ''}
          className={cn(
            success ? 'border border-success' : '',
            error ? 'border border-mistake' : '',
          )}
          {...props}
        />
        {secrue && (
          <button className="absolute right-4 top-3" type="button" onClick={() => setView(!view)}>
            {view ? <Icon path="/icons/eye.svg" /> : 'Hide'}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-sm text-mistake">{error}</p>}
    </div>
  );
};
