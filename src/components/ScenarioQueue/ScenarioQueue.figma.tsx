import figma from '@figma/code-connect'
import { ScenarioQueue } from './index'

figma.connect(ScenarioQueue, 'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=478-5781', {
  example: () => (
    <ScenarioQueue
      scenarios={scenarios}
      onReorder={handleReorder}
      onRequeue={handleRequeue}
    />
  ),
})
