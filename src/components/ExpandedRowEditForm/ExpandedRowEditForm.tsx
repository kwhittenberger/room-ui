import { forwardRef, useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { Input } from '../Input';
import { TextArea } from '../TextArea';
import { Select } from '../Select';
import { Checkbox } from '../Checkbox';
import { Switch } from '../Switch';
import { NumberInput } from '../NumberInput';
import { DatePicker } from '../DatePicker';
import { Button } from '../Button';
import { Spinner } from '../Spinner';

export type FormFieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'switch'
  | 'number'
  | 'date';

export interface FormFieldOption {
  /** Option value */
  value: string;
  /** Option label */
  label: string;
}

export interface FormField {
  /** Field name (key in data object) */
  name: string;
  /** Display label */
  label: string;
  /** Field type */
  type: FormFieldType;
  /** Whether field is required */
  required?: boolean;
  /** Options for select fields */
  options?: FormFieldOption[];
  /** Placeholder text */
  placeholder?: string;
  /** Custom validation function */
  validation?: (value: unknown) => string | undefined;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Help text */
  helpText?: string;
}

export interface ExpandedRowEditFormProps<T> {
  /** Current row data */
  row: T;
  /** Form field definitions */
  fields: FormField[];
  /** Save handler */
  onSave: (data: Partial<T>) => void | Promise<void>;
  /** Cancel handler */
  onCancel: () => void;
  /** Loading state */
  loading?: boolean;
  /** Save button label */
  saveLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Form layout */
  layout?: 'horizontal' | 'vertical';
  /** Columns for horizontal layout */
  columns?: 1 | 2 | 3;
  /** Additional class name */
  className?: string;
}

const columnConfig = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

const ExpandedRowEditForm = forwardRef(function ExpandedRowEditForm<T extends Record<string, unknown>>(
  {
    row,
    fields,
    onSave,
    onCancel,
    loading = false,
    saveLabel = 'Save',
    cancelLabel = 'Cancel',
    layout = 'horizontal',
    columns = 2,
    className,
  }: ExpandedRowEditFormProps<T>,
  ref: React.ForwardedRef<HTMLFormElement>
) {
  const [formData, setFormData] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    fields.forEach((field) => {
      initial[field.name] = row[field.name] ?? '';
    });
    return initial;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (field: FormField, value: unknown): string | undefined => {
      // Required validation
      if (field.required) {
        if (value === undefined || value === null || value === '') {
          return `${field.label} is required`;
        }
      }

      // Custom validation
      if (field.validation) {
        return field.validation(value);
      }

      return undefined;
    },
    []
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach((field) => {
      const error = validateField(field, formData[field.name]);
      if (error) {
        newErrors[field.name] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [fields, formData, validateField]);

  const handleChange = useCallback(
    (name: string, value: unknown) => {
      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear error on change
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (name: string) => {
      setTouched((prev) => ({ ...prev, [name]: true }));

      const field = fields.find((f) => f.name === name);
      if (field) {
        const error = validateField(field, formData[name]);
        if (error) {
          setErrors((prev) => ({ ...prev, [name]: error }));
        }
      }
    },
    [fields, formData, validateField]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allTouched: Record<string, boolean> = {};
      fields.forEach((f) => {
        allTouched[f.name] = true;
      });
      setTouched(allTouched);

      if (!validateForm()) {
        return;
      }

      await onSave(formData as Partial<T>);
    },
    [fields, formData, validateForm, onSave]
  );

  const renderField = (field: FormField) => {
    const value = formData[field.name];
    const error = touched[field.name] ? errors[field.name] : undefined;
    const isDisabled = loading || field.disabled;

    const commonProps = {
      disabled: isDisabled,
      error,
    };

    switch (field.type) {
      case 'text':
        return (
          <Input
            {...commonProps}
            value={String(value ?? '')}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
          />
        );

      case 'textarea':
        return (
          <TextArea
            {...commonProps}
            value={String(value ?? '')}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            placeholder={field.placeholder}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select
            {...commonProps}
            value={String(value ?? '')}
            onChange={(e) => handleChange(field.name, e.target.value)}
            onBlur={() => handleBlur(field.name)}
            options={
              field.options?.map((opt) => ({
                value: opt.value,
                label: opt.label,
              })) ?? []
            }
            placeholder={field.placeholder}
          />
        );

      case 'checkbox':
        return (
          <Checkbox
            checked={Boolean(value)}
            onChange={(checked) => handleChange(field.name, checked)}
            disabled={isDisabled}
          />
        );

      case 'switch':
        return (
          <Switch
            checked={Boolean(value)}
            onChange={(checked) => handleChange(field.name, checked)}
            disabled={isDisabled}
          />
        );

      case 'number':
        return (
          <NumberInput
            value={value as number | undefined}
            onChange={(val) => handleChange(field.name, val)}
            placeholder={field.placeholder}
            disabled={isDisabled}
          />
        );

      case 'date':
        return (
          <DatePicker
            {...commonProps}
            value={value as Date | string | null}
            onChange={(date) => handleChange(field.name, date)}
            placeholder={field.placeholder}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit}
      className={cn('', className)}
    >
      <div
        className={cn(
          'grid gap-4',
          layout === 'horizontal' && columnConfig[columns]
        )}
      >
        {fields.map((field) => (
          <div key={field.name} className="space-y-1.5">
            <label className="text-sm font-medium text-room-text-primary">
              {field.label}
              {field.required && (
                <span className="text-room-error ml-0.5">*</span>
              )}
            </label>
            {renderField(field)}
            {field.helpText && !errors[field.name] && (
              <p className="text-xs text-room-text-muted">{field.helpText}</p>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-6 pt-4 border-t border-room-border">
        <Button
          type="submit"
          disabled={loading}
        >
          {loading && <Spinner size="sm" className="mr-2" />}
          {saveLabel}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          {cancelLabel}
        </Button>
      </div>
    </form>
  );
}) as <T extends Record<string, unknown>>(
  props: ExpandedRowEditFormProps<T> & { ref?: React.ForwardedRef<HTMLFormElement> }
) => React.ReactElement;

export { ExpandedRowEditForm };
export default ExpandedRowEditForm;
