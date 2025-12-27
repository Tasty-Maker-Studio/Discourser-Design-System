import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const switchControlDefaultVariants = {
  "size": "md"
}
const switchControlCompoundVariants = []

const switchControlSlotNames = [
  [
    "root",
    "switchControl__root"
  ],
  [
    "control",
    "switchControl__control"
  ],
  [
    "thumb",
    "switchControl__thumb"
  ],
  [
    "label",
    "switchControl__label"
  ]
]
const switchControlSlotFns = /* @__PURE__ */ switchControlSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, switchControlDefaultVariants, getSlotCompoundVariant(switchControlCompoundVariants, slotName))])

const switchControlFn = memo((props = {}) => {
  return Object.fromEntries(switchControlSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const switchControlVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...switchControlDefaultVariants, ...compact(variants) })

export const switchControl = /* @__PURE__ */ Object.assign(switchControlFn, {
  __recipe__: false,
  __name__: 'switchControl',
  raw: (props) => props,
  variantKeys: switchControlVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, switchControlVariantKeys)
  },
  getVariantProps
})