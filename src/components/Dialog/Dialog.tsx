import { forwardRef, type ReactNode } from 'react';
import { Dialog as ArkDialog } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { dialog } from 'styled-system/recipes';

export interface DialogProps {
  /**
   * Whether the dialog is open
   */
  open?: boolean;
  /**
   * Callback when the dialog open state changes
   */
  onOpenChange?: (details: { open: boolean }) => void;
  /**
   * Dialog title
   */
  title?: string;
  /**
   * Dialog description/content
   */
  description?: string;
  /**
   * Dialog content (alternative to description for custom content)
   */
  children?: ReactNode;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom close button label for accessibility
   * @default 'Close'
   */
  closeLabel?: string;
  /**
   * Size variant
   * @default "md"
   */
  size?: 'sm' | 'md' | 'lg' | 'fullscreen';
}

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      children,
      size,
      showCloseButton = true,
      closeLabel = 'Close',
    },
    ref
  ) => {
    const classes = dialog({ size });

    return (
      <ArkDialog.Root open={open} onOpenChange={onOpenChange}>
        <Portal>
          <ArkDialog.Backdrop className={classes.backdrop} />
          <ArkDialog.Positioner className={classes.positioner}>
            <ArkDialog.Content ref={ref} className={classes.content}>
              {title && (
                <ArkDialog.Title className={classes.title}>{title}</ArkDialog.Title>
              )}
              {description && (
                <ArkDialog.Description className={classes.description}>
                  {description}
                </ArkDialog.Description>
              )}
              {children && (
                <div className={classes.description}>{children}</div>
              )}
              {showCloseButton && (
                <ArkDialog.CloseTrigger
                  className={classes.closeTrigger}
                  aria-label={closeLabel}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </ArkDialog.CloseTrigger>
              )}
            </ArkDialog.Content>
          </ArkDialog.Positioner>
        </Portal>
      </ArkDialog.Root>
    );
  }
);

Dialog.displayName = 'Dialog';
