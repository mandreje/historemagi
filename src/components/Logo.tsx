import { BookOpen, Wand2, Sparkles } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: {
      container: 'h-8',
      icon: 'w-6 h-6',
      text: 'text-lg',
      spark: 'w-3 h-3',
    },
    md: {
      container: 'h-10',
      icon: 'w-8 h-8',
      text: 'text-xl',
      spark: 'w-4 h-4',
    },
    lg: {
      container: 'h-12',
      icon: 'w-10 h-10',
      text: 'text-2xl',
      spark: 'w-5 h-5',
    },
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`relative ${sizes[size].container} aspect-square`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <BookOpen className={`${sizes[size].icon} text-purple-600`} />
        </div>
        <div className="absolute -top-1 -right-1">
          <Wand2 className={`${sizes[size].spark} text-pink-500 rotate-12`} />
        </div>
        <div className="absolute -bottom-1 -left-1">
          <Sparkles className={`${sizes[size].spark} text-purple-400`} />
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <span className={`${sizes[size].text} font-bold bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text`}>
            Historie Magi
          </span>
          <span className="text-xs text-gray-500 -mt-1">
            Din magiske historieforteller
          </span>
        </div>
      )}
    </div>
  );
}