/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SwitchControlVariant {
  /**
 * @default "md"
 */
size: "sm" | "md"
}

type SwitchControlVariantMap = {
  [key in keyof SwitchControlVariant]: Array<SwitchControlVariant[key]>
}

export type SwitchControlVariantProps = {
  [key in keyof SwitchControlVariant]?: ConditionalValue<SwitchControlVariant[key]> | undefined
}

export interface SwitchControlRecipe {
  __type: SwitchControlVariantProps
  (props?: SwitchControlVariantProps): Pretty<Record<"root" | "control" | "thumb" | "label", string>>
  raw: (props?: SwitchControlVariantProps) => SwitchControlVariantProps
  variantMap: SwitchControlVariantMap
  variantKeys: Array<keyof SwitchControlVariant>
  splitVariantProps<Props extends SwitchControlVariantProps>(props: Props): [SwitchControlVariantProps, Pretty<DistributiveOmit<Props, keyof SwitchControlVariantProps>>]
  getVariantProps: (props?: SwitchControlVariantProps) => SwitchControlVariantProps
}

/**
 * Material Design 3 switch component


 */
export declare const switchControl: SwitchControlRecipe