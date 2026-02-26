import figma from '@figma/code-connect'
import { Skeleton } from './Skeleton'

figma.connect(Skeleton, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  example: () => <Skeleton css={{ h: '4', w: '40', borderRadius: 'md' }} />,
})
