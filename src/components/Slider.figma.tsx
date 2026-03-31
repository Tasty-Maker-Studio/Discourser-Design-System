import figma from '@figma/code-connect';
import * as Slider from './Slider';

figma.connect(
  Slider.Root,
  'https://www.figma.com/design/GaHmFfmvO4loUzuZS4TgEz/Discourser.AI--V1?node-id=38-7988',
  {
    example: () => (
      <Slider.Root defaultValue={[50]}>
        <Slider.Label>Volume</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumbs />
        </Slider.Control>
      </Slider.Root>
    ),
  },
);
