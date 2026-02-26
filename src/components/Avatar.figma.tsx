import figma from '@figma/code-connect'
import * as Avatar from './Avatar'

figma.connect(Avatar.Root, 'https://www.figma.com/design/ua4LYtQHXt2lhHlCsSpdBm', {
  props: {
    size: figma.enum('Size', { xs: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl', '2xl': '2xl' }),
  },
  example: ({ size }) => (
    <Avatar.Root size={size}>
      <Avatar.Image src="avatar.jpg" alt="User" />
      <Avatar.Fallback name="User Name" />
    </Avatar.Root>
  ),
})
