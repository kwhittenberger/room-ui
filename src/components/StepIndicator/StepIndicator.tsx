import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface Step {
  id: string;
  label: string;
  description?: string;
}

export interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
  variant?: 'horizontal' | 'vertical';
  onStepClick?: (stepIndex: number) => void;
}

export function StepIndicator({
  steps,
  currentStep,
  variant = 'horizontal',
  onStepClick,
}: StepIndicatorProps) {
  const isVertical = variant === 'vertical';

  return (
    <nav aria-label="Progress" className={isVertical ? 'space-y-4' : ''}>
      <ol
        className={cn(
          isVertical ? 'space-y-4' : 'flex items-center justify-between'
        )}
      >
        {steps.map((step, index) => {
          const isComplete = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = onStepClick && (isComplete || isCurrent);

          return (
            <li
              key={step.id}
              className={cn(
                isVertical ? 'relative' : 'flex-1'
              )}
            >
              <button
                onClick={() => isClickable && onStepClick(index)}
                disabled={!isClickable}
                className={cn(
                  isVertical ? 'flex items-start gap-3' : 'flex flex-col items-center',
                  isClickable ? 'cursor-pointer' : 'cursor-default',
                  'group w-full'
                )}
              >
                {/* Step Circle */}
                <div
                  className={cn(
                    'relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200',
                    isComplete
                      ? 'bg-emerald-500 border-emerald-500'
                      : isCurrent
                      ? 'bg-cyan-500 border-cyan-500'
                      : 'bg-slate-800 border-slate-600',
                    isClickable && 'group-hover:shadow-md group-hover:shadow-slate-900/50'
                  )}
                >
                  {isComplete ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span
                      className={cn(
                        'text-sm font-medium',
                        isCurrent ? 'text-white' : 'text-slate-400'
                      )}
                    >
                      {index + 1}
                    </span>
                  )}
                </div>

                {/* Step Label */}
                <div className={cn(isVertical ? 'flex-1 text-left' : 'mt-2 text-center')}>
                  <p
                    className={cn(
                      'text-sm font-medium transition-colors',
                      isComplete || isCurrent ? 'text-slate-100' : 'text-slate-400'
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p className="text-xs text-slate-500 mt-1">{step.description}</p>
                  )}
                </div>

                {/* Connector Line (Vertical) */}
                {isVertical && index < steps.length - 1 && (
                  <div
                    className={cn(
                      'absolute left-5 top-10 w-0.5 h-full -ml-px transition-colors',
                      isComplete ? 'bg-emerald-500' : 'bg-slate-700'
                    )}
                  />
                )}
              </button>

              {/* Connector Line (Horizontal) */}
              {!isVertical && index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4 mt-5 transition-colors',
                    isComplete ? 'bg-emerald-500' : 'bg-slate-700'
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default StepIndicator;
