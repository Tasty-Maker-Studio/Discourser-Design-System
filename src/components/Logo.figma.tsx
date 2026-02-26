import figma from '@figma/code-connect'
import { DiscourserLogo } from './Icons/DiscourserLogo'

figma.connect(DiscourserLogo, 'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-4045', {
  example: () => <DiscourserLogo />,
})
