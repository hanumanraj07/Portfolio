import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { Loader } from '~/components/loader';
import { deviceModels } from '~/components/model/device-models';
import { useInViewport } from '~/hooks';
import { useHydrated } from '~/hooks/useHydrated';
import { media } from '~/utils/style';

const Model = lazy(() =>
  import('~/components/model').then(module => ({ default: module.Model }))
);

const phoneSizes = `(max-width: ${media.tablet}px) 30vw, 20vw`;
const laptopSizes = `(max-width: ${media.tablet}px) 80vw, 40vw`;
const nearViewport = { rootMargin: '75% 0px' };

/**
 * Mount heavy content once it is close to the viewport, during idle time, so
 * the WebGL setup doesn't land on the frame where the section scrolls in
 */
export function usePrewarm(ref, visible) {
  const near = useInViewport(ref, true, nearViewport);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    if (visible) {
      setReady(true);
      return;
    }

    if (!near) return;

    const requestIdle =
      window.requestIdleCallback || (callback => setTimeout(callback, 50));
    const cancelIdle = window.cancelIdleCallback || clearTimeout;
    const handle = requestIdle(() => setReady(true), { timeout: 1500 });

    return () => cancelIdle(handle);
  }, [near, visible, ready]);

  return ready;
}

/**
 * A project's 3D device: a laptop, or a pair of phones for mobile projects
 */
export const ProjectDevice = ({ model, visible, className, loaderClassName }) => {
  const ref = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);
  const isHydrated = useHydrated();
  const prewarmed = usePrewarm(ref, visible);
  const isLaptop = model.type === 'laptop';

  const models = isLaptop
    ? [
        {
          ...deviceModels.laptop,
          texture: { ...model.textures[0], sizes: laptopSizes },
        },
      ]
    : [
        {
          ...deviceModels.phone,
          position: { x: -0.6, y: 1.1, z: 0 },
          texture: { ...model.textures[0], sizes: phoneSizes },
        },
        {
          ...deviceModels.phone,
          position: { x: 0.6, y: -0.5, z: 0.3 },
          texture: { ...model.textures[1], sizes: phoneSizes },
        },
      ];

  return (
    <div className={className} data-device={model.type} ref={ref}>
      {!modelLoaded && (
        <Loader center className={loaderClassName} data-visible={visible} />
      )}
      {isHydrated && prewarmed && (
        <Suspense>
          <Model
            alt={model.alt}
            cameraPosition={{ x: 0, y: 0, z: isLaptop ? 8 : 11.5 }}
            showDelay={isLaptop ? 700 : 300}
            onLoad={() => setModelLoaded(true)}
            show={visible}
            models={models}
          />
        </Suspense>
      )}
    </div>
  );
};
