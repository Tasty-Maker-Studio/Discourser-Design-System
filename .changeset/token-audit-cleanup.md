---
'@discourser/design-system': minor
---

Token audit cleanup: add Divider component, 2xs spacing token, Fraunces variable font axes, and update documentation

- Add `Divider` component with optional label and horizontal/vertical orientation
- Add `2xs = 12px` spacing token to fill the gap between `xs` (4px) and `sm` (8px)
- Add `fontVariationSettings: 'SOFT 0, WONK 1'` to `displayLarge` and `headlineMedium` text styles (Fraunces variable font)
- Extend `TypeStyle` contract and `transformTextStyles` to pass through `fontVariationSettings`
- Document canonical radii naming convention (Park UI `l1/l2/l3`) in `panda.config.ts` and spacing docs
- Document inline Link pattern and Park UI utility text styles in typography docs
- Document social login button pattern in button docs
