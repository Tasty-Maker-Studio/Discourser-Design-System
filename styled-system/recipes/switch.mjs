import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const switchDefaultVariants = {
  "size": "md"
}
const switchCompoundVariants = []

const switchSlotNames = [
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
const switchSlotFns = /* @__PURE__ */ switchSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, switchDefaultVariants, getSlotCompoundVariant(switchCompoundVariants, slotName))])

const switchFn = memo((props = {}) => {
  return Object.fromEntries(switchSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const switchVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...switchDefaultVariants, ...compact(variants) })

export const switch = /* @__PURE__ */ Object.assign(switchFn, {
  __recipe__: false,
  __name__: 'switch',
  raw: (props) => props,
  variantKeys: switchVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, switchVariantKeys)
  },
  getVariantProps
})