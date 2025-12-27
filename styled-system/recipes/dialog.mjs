import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dialogDefaultVariants = {
  "size": "md"
}
const dialogCompoundVariants = []

const dialogSlotNames = [
  [
    "backdrop",
    "dialog__backdrop"
  ],
  [
    "positioner",
    "dialog__positioner"
  ],
  [
    "content",
    "dialog__content"
  ],
  [
    "title",
    "dialog__title"
  ],
  [
    "description",
    "dialog__description"
  ],
  [
    "closeTrigger",
    "dialog__closeTrigger"
  ]
]
const dialogSlotFns = /* @__PURE__ */ dialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dialogDefaultVariants, getSlotCompoundVariant(dialogCompoundVariants, slotName))])

const dialogFn = memo((props = {}) => {
  return Object.fromEntries(dialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dialogVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...dialogDefaultVariants, ...compact(variants) })

export const dialog = /* @__PURE__ */ Object.assign(dialogFn, {
  __recipe__: false,
  __name__: 'dialog',
  raw: (props) => props,
  variantKeys: dialogVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg",
    "fullscreen"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dialogVariantKeys)
  },
  getVariantProps
})