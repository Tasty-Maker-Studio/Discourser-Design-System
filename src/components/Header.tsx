import type { ComponentProps, ElementType } from 'react'
import { styled } from 'styled-system/jsx'
import { type HeadingVariantProps, heading } from 'styled-system/recipes'
import type { StyledComponent } from 'styled-system/types'

type Props = HeadingVariantProps & { as?: ElementType };

export type HeadingProps = ComponentProps<typeof Header>;
export const Header = styled('h2', heading) as StyledComponent<'h2', Props>;
