import { ark } from '@ark-ui/react/factory';
import { forwardRef, type ComponentProps } from 'react';
import { css, cx } from 'styled-system/css';
import { styled } from 'styled-system/jsx';
import { badge } from 'styled-system/recipes';

type BaseBadgeProps = ComponentProps<typeof BaseBadge>;
const BaseBadge = styled(ark.div, badge);

// Override colorPalette type to provide specific values
export interface BadgeProps extends Omit<BaseBadgeProps, 'colorPalette'> {
  /**
   * The color palette to use for the badge.
   * @default "primary"
   */
  colorPalette?: 'primary' | 'neutral' | 'error' | 'gray' | 'red' | undefined;
}

export const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  function Badge(props, ref) {
    const { colorPalette = 'primary', className, ...rest } = props;

    // Apply colorPalette using Panda's css() function
    const colorPaletteClass = css({ colorPalette });
    const mergedClassName = cx(colorPaletteClass, className);

    return <BaseBadge ref={ref} {...rest} className={mergedClassName} />;
  },
);
