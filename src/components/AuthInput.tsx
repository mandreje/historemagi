import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AuthInputProps {
  id: string;
  name: string;
  type: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  Icon: LucideIcon;
  autoComplete?: string;
}

export function AuthInput({
  id,
  name,
  type,
  label,
  value,
  onChange,
  placeholder,
  Icon,
  autoComplete
}: AuthInputProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <div className="flex items-center">
        <span className="absolute left-3 text-gray-400">
          <Icon size={20} />
        </span>
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          required
          className="appearance-none rounded-md relative block w-full px-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
      </div>
    </div>
  );
}