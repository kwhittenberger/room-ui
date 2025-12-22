import { useState, useCallback } from 'react';
import type { ConfirmDialogProps } from './ConfirmDialog';

type ConfirmDialogConfig = Omit<ConfirmDialogProps, 'isOpen' | 'onClose' | 'isLoading'>;

export interface UseConfirmDialogReturn {
  /** Show the confirm dialog with the given configuration */
  show: (config: ConfirmDialogConfig) => void;
  /** Close the confirm dialog */
  close: () => void;
  /** Props to spread onto the ConfirmDialog component */
  props: ConfirmDialogProps;
}

/**
 * Hook for managing ConfirmDialog state
 *
 * @example
 * ```tsx
 * import { ConfirmDialog, useConfirmDialog, Button } from 'room-ui';
 *
 * function DeleteButton() {
 *   const confirmDialog = useConfirmDialog();
 *
 *   const handleDelete = () => {
 *     confirmDialog.show({
 *       title: 'Delete Item',
 *       message: 'Are you sure you want to delete this item? This action cannot be undone.',
 *       variant: 'danger',
 *       confirmLabel: 'Delete',
 *       onConfirm: async () => {
 *         await deleteItem();
 *       },
 *     });
 *   };
 *
 *   return (
 *     <>
 *       <Button variant="danger" onClick={handleDelete}>
 *         Delete
 *       </Button>
 *       <ConfirmDialog {...confirmDialog.props} />
 *     </>
 *   );
 * }
 * ```
 */
export function useConfirmDialog(): UseConfirmDialogReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState<ConfirmDialogConfig>({
    onConfirm: () => {},
    title: 'Confirm',
    message: 'Are you sure?',
  });

  const show = useCallback((newConfig: ConfirmDialogConfig) => {
    setConfig(newConfig);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
  }, []);

  const handleConfirm = useCallback(async () => {
    setIsLoading(true);
    try {
      await config.onConfirm();
      close();
    } catch (error) {
      console.error('Confirm action failed:', error);
      setIsLoading(false);
      throw error;
    }
  }, [config, close]);

  return {
    show,
    close,
    props: {
      ...config,
      isOpen,
      onClose: close,
      onConfirm: handleConfirm,
      isLoading,
    },
  };
}
