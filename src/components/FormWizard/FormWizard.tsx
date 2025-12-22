import React, { useState, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  content: React.ReactNode;
  validate?: () => boolean | Promise<boolean>;
}

export interface FormWizardProps {
  steps: WizardStep[];
  onComplete: (data: Record<string, unknown>) => void | Promise<void>;
  onStepChange?: (stepIndex: number) => void;
  showStepNumbers?: boolean;
  allowSkip?: boolean;
  className?: string;
}

const FormWizard = forwardRef<HTMLDivElement, FormWizardProps>(
  (
    {
      steps,
      onComplete,
      onStepChange,
      showStepNumbers = true,
      allowSkip = false,
      className = '',
    },
    ref
  ) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
    const [formData] = useState<Record<string, unknown>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isFirstStep = currentStep === 0;
    const isLastStep = currentStep === steps.length - 1;

    // Go to specific step
    const goToStep = (stepIndex: number) => {
      if (stepIndex < 0 || stepIndex >= steps.length) return;
      if (!allowSkip && stepIndex > currentStep && !completedSteps.has(currentStep)) return;

      setCurrentStep(stepIndex);
      onStepChange?.(stepIndex);
    };

    // Next step
    const nextStep = async () => {
      const step = steps[currentStep];

      // Validate current step
      if (step.validate) {
        const isValid = await step.validate();
        if (!isValid) return;
      }

      // Mark as completed
      setCompletedSteps((prev) => new Set(prev).add(currentStep));

      if (isLastStep) {
        // Submit form
        setIsSubmitting(true);
        try {
          await onComplete(formData);
        } catch (error) {
          console.error('Form wizard submission error:', error);
        } finally {
          setIsSubmitting(false);
        }
      } else {
        // Advance to next step
        const nextStepIndex = currentStep + 1;
        setCurrentStep(nextStepIndex);
        onStepChange?.(nextStepIndex);
      }
    };

    // Previous step
    const prevStep = () => {
      if (!isFirstStep) {
        goToStep(currentStep - 1);
      }
    };

    return (
      <div ref={ref} className={cn(className)}>
        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = index === currentStep;
              const isCompleted = completedSteps.has(index);
              const isPast = index < currentStep;
              const isClickable = allowSkip || isPast || index === currentStep;

              return (
                <React.Fragment key={step.id}>
                  {/* Step */}
                  <button
                    type="button"
                    onClick={() => isClickable && goToStep(index)}
                    disabled={!isClickable}
                    className={cn(
                      'flex flex-col items-center gap-2 flex-1 max-w-[200px]',
                      isClickable ? 'cursor-pointer' : 'cursor-not-allowed'
                    )}
                  >
                    {/* Circle */}
                    <div
                      className={cn(
                        'h-10 w-10 rounded-full flex items-center justify-center',
                        'font-semibold text-sm transition-all',
                        isCompleted
                          ? 'bg-emerald-500 text-white'
                          : isActive
                            ? 'bg-cyan-500 text-white'
                            : 'bg-slate-700 text-slate-400'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : showStepNumbers ? (
                        index + 1
                      ) : (
                        <div className="h-2 w-2 rounded-full bg-current" />
                      )}
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <div
                        className={cn(
                          'text-sm font-medium',
                          isActive ? 'text-cyan-400' : 'text-slate-400'
                        )}
                      >
                        {step.title}
                      </div>
                      {step.description && (
                        <div className="text-xs text-slate-500 mt-0.5">{step.description}</div>
                      )}
                    </div>
                  </button>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="flex-1 mx-2 mt-[-30px]">
                      <div
                        className={cn(
                          'h-0.5 transition-colors',
                          completedSteps.has(index)
                            ? 'bg-emerald-500'
                            : index < currentStep
                              ? 'bg-cyan-500'
                              : 'bg-slate-700'
                        )}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          {steps.map((step, index) => (
            <div key={step.id} hidden={index !== currentStep}>
              {step.content}
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <button
            type="button"
            onClick={prevStep}
            disabled={isFirstStep}
            className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-600 rounded-lg hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>

          <div className="text-sm text-slate-400">
            Step {currentStep + 1} of {steps.length}
          </div>

          <button
            type="button"
            onClick={nextStep}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-cyan-600 rounded-lg hover:bg-cyan-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
          >
            {isSubmitting ? 'Submitting...' : isLastStep ? 'Complete' : 'Next'}
          </button>
        </div>
      </div>
    );
  }
);

FormWizard.displayName = 'FormWizard';

export default FormWizard;
