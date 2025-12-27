/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface IconButtonVariant {
  /**
 * @default "standard"
 */
variant: "standard" | "filled" | "tonal" | "outlined"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type IconButtonVariantMap = {
  [key in keyof IconButtonVariant]: Array<IconButtonVariant[key]>
}

export type IconButtonVariantProps = {
  [key in keyof IconButtonVariant]?: ConditionalValue<IconButtonVariant[key]> | undefined
}

export interface IconButtonRecipe {
  __type: IconButtonVariantProps
  (props?: IconButtonVariantProps): string
  raw: (props?: IconButtonVariantProps) => IconButtonVariantProps
  variantMap: IconButtonVariantMap
  variantKeys: Array<keyof IconButtonVariant>
  splitVariantProps<Props extends IconButtonVariantProps>(props: Props): [IconButtonVariantProps, Pretty<DistributiveOmit<Props, keyof IconButtonVariantProps>>]
  getVariantProps: (props?: IconButtonVariantProps) => IconButtonVariantProps
}

/**
 * Material Design 3 icon button component


 */
export declare const iconButton: IconButtonRecipe