import flatlineImage from '~/assets/flatline.png';
import { Model } from '~/components/model';
import { StoryContainer } from '../../../.storybook/story-container';
import { deviceModels } from './device-models';

export default {
  title: 'Model',
};

const modelStyle = { position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 };

export const Phone = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 11.5 }}
      alt="Phone model"
      models={[
        {
          ...deviceModels.phone,
          position: { x: 0, y: 0, z: 0.1 },
          texture: {
            srcSet: `${flatlineImage} 375w, ${flatlineImage} 750w`,
            placeholder: flatlineImage,
          },
        },
      ]}
    />
  </StoryContainer>
);

export const Laptop = () => (
  <StoryContainer padding={0}>
    <Model
      style={modelStyle}
      cameraPosition={{ x: 0, y: 0, z: 8 }}
      alt="Laptop model"
      models={[
        {
          ...deviceModels.laptop,
          position: { x: 0, y: 0, z: 0 },
          texture: {
            srcSet: `${flatlineImage} 800w, ${flatlineImage} 1920w`,
            placeholder: flatlineImage,
          },
        },
      ]}
    />
  </StoryContainer>
);
