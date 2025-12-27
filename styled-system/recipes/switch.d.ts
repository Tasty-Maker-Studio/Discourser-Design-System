/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SwitchVariant {
  /**
 * @default "md"
 */
size: "sm" | "md"
}

type SwitchVariantMap = {
  [key in keyof SwitchVariant]: Array<SwitchVariant[key]>
}

export type SwitchVariantProps = {
  [key in keyof SwitchVariant]?: ConditionalValue<SwitchVariant[key]> | undefined
}

export interface SwitchRecipe {
  __type: SwitchVariantProps
  (props?: SwitchVariantProps): Pretty<Record<"root" | "control" | "thumb" | "label", string>>
  raw: (props?: SwitchVariantProps) => SwitchVariantProps
  variantMap: SwitchVariantMap
  variantKeys: Array<keyof SwitchVariant>
  splitVariantProps<Props extends SwitchVariantProps>(props: Props): [SwitchVariantProps, Pretty<DistributiveOmit<Props, keyof SwitchVariantProps>>]
  getVariantProps: (props?: SwitchVariantProps) => SwitchVariantProps
}

/**
 * Material Design 3 switch component


 */
export declare const switch: SwitchRecipe