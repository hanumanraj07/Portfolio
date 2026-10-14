import { Cache, Texture, TextureLoader } from 'three';
import { DRACOLoader, GLTFLoader } from 'three-stdlib';

// Enable caching for all loaders
Cache.enabled = true;

const dracoLoader = new DRACOLoader();
const gltfLoader = new GLTFLoader();
dracoLoader.setDecoderPath('/draco/');
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * GLTF model loader configured with draco decoder
 */
export const modelLoader = gltfLoader;
export const textureLoader = new TextureLoader();

let bitmapSupport;

// Same browser cut-offs three.js uses before trusting ImageBitmap textures
function supportsImageBitmap() {
  if (bitmapSupport !== undefined) return bitmapSupport;

  const userAgent = typeof navigator === 'undefined' ? '' : navigator.userAgent;
  const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
  const safariVersion = isSafari
    ? Number(userAgent.match(/Version\/(\d+)/)?.[1])
    : Infinity;
  const firefoxVersion = userAgent.includes('Firefox')
    ? Number(userAgent.match(/Firefox\/(\d+)/)?.[1])
    : Infinity;

  bitmapSupport =
    typeof createImageBitmap === 'function' &&
    safariVersion >= 17 &&
    firefoxVersion >= 98;

  return bitmapSupport;
}

/**
 * Load an image as a texture, decoding it off the main thread where possible.
 * A plain `<img>` texture is decoded synchronously on the main thread when it
 * is first uploaded, which stalls scrolling for large screenshots.
 */
export async function loadImageTexture(url) {
  if (!supportsImageBitmap()) return textureLoader.loadAsync(url);

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to load texture: ${url}`);

  const bitmap = await createImageBitmap(await response.blob(), {
    premultiplyAlpha: 'none',
    colorSpaceConversion: 'default',
  });

  const texture = new Texture(bitmap);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Free a texture's GPU memory and its decoded bitmap
 */
export const disposeTexture = texture => {
  texture?.dispose();
  texture?.source?.data?.close?.();
};

/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = scene => {
  scene?.traverse(object => {
    if (!object.isMesh) return;

    object.geometry.dispose();

    if (object.material.isMaterial) {
      cleanMaterial(object.material);
    } else {
      for (const material of object.material) {
        cleanMaterial(material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();

      // Close GLTF bitmap textures
      value.source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = renderer => {
  renderer.dispose();
  renderer = null;
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = lights => {
  for (const light of lights) {
    light.parent.remove(light);
  }
};

/**
 * Get child by name
 */
export const getChild = (name, object) => {
  let node;

  object.traverse(child => {
    if (child.name === name) {
      node = child;
    }
  });

  return node;
};
