import { useState, useMemo, useRef, forwardRef, useImperativeHandle } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface PasswordInputHandle {
  focus: () => void;
  blur: () => void;
}

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
  feedback: string[];
}

export interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  showStrength?: boolean;
  showRequirements?: boolean;
  requirements?: {
    minLength?: number;
    requireUppercase?: boolean;
    requireLowercase?: boolean;
    requireNumber?: boolean;
    requireSpecial?: boolean;
  };
  className?: string;
}

export const PasswordInput = forwardRef<PasswordInputHandle, PasswordInputProps>(({
  value,
  onChange,
  label,
  placeholder = 'Enter password',
  required = false,
  disabled = false,
  error,
  helperText,
  showStrength = true,
  showRequirements = true,
  requirements = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true,
    requireSpecial: true,
  },
  className = '',
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
  }));

  const strength = useMemo((): PasswordStrength => {
    if (!value) {
      return { score: 0, label: 'Too weak', color: 'bg-slate-600', feedback: [] };
    }

    let score = 0;
    const feedback: string[] = [];

    if (value.length >= (requirements.minLength || 8)) {
      score++;
    } else {
      feedback.push(`At least ${requirements.minLength || 8} characters`);
    }

    if (requirements.requireUppercase && /[A-Z]/.test(value)) {
      score++;
    } else if (requirements.requireUppercase) {
      feedback.push('One uppercase letter');
    }

    if (requirements.requireLowercase && /[a-z]/.test(value)) {
      score++;
    } else if (requirements.requireLowercase) {
      feedback.push('One lowercase letter');
    }

    if (requirements.requireNumber && /[0-9]/.test(value)) {
      score++;
    } else if (requirements.requireNumber) {
      feedback.push('One number');
    }

    if (requirements.requireSpecial && /[^A-Za-z0-9]/.test(value)) {
      score++;
    } else if (requirements.requireSpecial) {
      feedback.push('One special character');
    }

    const maxScore = [
      requirements.minLength,
      requirements.requireUppercase,
      requirements.requireLowercase,
      requirements.requireNumber,
      requirements.requireSpecial,
    ].filter(Boolean).length;

    const percentage = (score / maxScore) * 100;

    if (percentage === 100) {
      return { score, label: 'Strong', color: 'bg-emerald-500', feedback };
    } else if (percentage >= 75) {
      return { score, label: 'Good', color: 'bg-emerald-400', feedback };
    } else if (percentage >= 50) {
      return { score, label: 'Fair', color: 'bg-amber-500', feedback };
    } else if (percentage >= 25) {
      return { score, label: 'Weak', color: 'bg-red-400', feedback };
    } else {
      return { score, label: 'Too weak', color: 'bg-red-500', feedback };
    }
  }, [value, requirements]);

  const requirementsMet = useMemo(() => {
    return {
      length: value.length >= (requirements.minLength || 8),
      uppercase: !requirements.requireUppercase || /[A-Z]/.test(value),
      lowercase: !requirements.requireLowercase || /[a-z]/.test(value),
      number: !requirements.requireNumber || /[0-9]/.test(value),
      special: !requirements.requireSpecial || /[^A-Za-z0-9]/.test(value),
    };
  }, [value, requirements]);

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-100 mb-1.5">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          ref={inputRef}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            'w-full px-3 py-2 pr-10',
            'text-sm text-slate-100 placeholder-slate-500',
            'bg-slate-800 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500',
            'disabled:bg-slate-900 disabled:cursor-not-allowed',
            'transition-colors',
            error
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-slate-700'
          )}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {showStrength && value && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium text-slate-400">Password strength:</span>
            <span className={cn('text-xs font-semibold', strength.color.replace('bg-', 'text-'))}>
              {strength.label}
            </span>
          </div>
          <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
            <div
              className={cn('h-full transition-all duration-300', strength.color)}
              style={{ width: `${(strength.score / 5) * 100}%` }}
            />
          </div>
        </div>
      )}

      {showRequirements && value && (
        <div className="mt-3 space-y-1">
          {requirements.minLength && (
            <div className="flex items-center gap-2 text-xs">
              {requirementsMet.length ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              )}
              <span className={requirementsMet.length ? 'text-emerald-400' : 'text-slate-400'}>
                At least {requirements.minLength} characters
              </span>
            </div>
          )}
          {requirements.requireUppercase && (
            <div className="flex items-center gap-2 text-xs">
              {requirementsMet.uppercase ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              )}
              <span className={requirementsMet.uppercase ? 'text-emerald-400' : 'text-slate-400'}>
                One uppercase letter
              </span>
            </div>
          )}
          {requirements.requireLowercase && (
            <div className="flex items-center gap-2 text-xs">
              {requirementsMet.lowercase ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              )}
              <span className={requirementsMet.lowercase ? 'text-emerald-400' : 'text-slate-400'}>
                One lowercase letter
              </span>
            </div>
          )}
          {requirements.requireNumber && (
            <div className="flex items-center gap-2 text-xs">
              {requirementsMet.number ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              )}
              <span className={requirementsMet.number ? 'text-emerald-400' : 'text-slate-400'}>
                One number
              </span>
            </div>
          )}
          {requirements.requireSpecial && (
            <div className="flex items-center gap-2 text-xs">
              {requirementsMet.special ? (
                <Check className="h-3.5 w-3.5 text-emerald-400 flex-shrink-0" />
              ) : (
                <X className="h-3.5 w-3.5 text-red-400 flex-shrink-0" />
              )}
              <span className={requirementsMet.special ? 'text-emerald-400' : 'text-slate-400'}>
                One special character
              </span>
            </div>
          )}
        </div>
      )}

      {error && (
        <p className="mt-1.5 text-xs text-red-400">{error}</p>
      )}

      {helperText && !error && (
        <p className="mt-1.5 text-xs text-slate-400">{helperText}</p>
      )}
    </div>
  );
});

PasswordInput.displayName = 'PasswordInput';
export default PasswordInput;
