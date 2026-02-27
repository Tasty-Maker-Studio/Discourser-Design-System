import figma from '@figma/code-connect'
import { ScenarioSettings } from './index'

figma.connect(ScenarioSettings, 'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-8240', {
  example: () => (
    <ScenarioSettings
      defaultValue={['duration', 'number-of-questions']}
      defaultDuration="standard"
      defaultQuestionCount="standard"
    />
  ),
})
