/**
 * Convert a `sizes` length (e.g. `80vw`, `480px`) to CSS pixels
 */
function lengthToPx(length) {
  const value = parseFloat(length);
  if (Number.isNaN(value)) return window.innerWidth;
  if (length.endsWith('vw')) return (value / 100) * window.innerWidth;
  if (length.endsWith('rem') || length.endsWith('em')) return value * 16;
  return value;
}

/**
 * The slot width the browser would use for a `sizes` attribute
 */
function getSlotWidth(sizes) {
  if (!sizes) return window.innerWidth;

  for (const entry of sizes.split(',')) {
    const trimmed = entry.trim();
    const match = trimmed.match(/^(\(.*\))\s+(\S+)$/);

    if (!match) return lengthToPx(trimmed);
    if (window.matchMedia(match[1]).matches) return lengthToPx(match[2]);
  }

  return window.innerWidth;
}

/**
 * Pick the `srcSet` candidate the browser would load for non-html images
 * (WebGL textures, videos), without loading anything to find out
 */
export async function resolveSrcFromSrcSet({ srcSet, sizes }) {
  const candidates = srcSet
    .split(',')
    .map(entry => entry.trim())
    .filter(Boolean)
    .map(entry => {
      const [src, descriptor = '1w'] = entry.split(/\s+/);
      return { src, width: Number(descriptor.replace('w', '')) || 1 };
    })
    .sort((a, b) => a.width - b.width);

  if (new Set(candidates.map(candidate => candidate.src)).size === 1) {
    return candidates[0].src;
  }

  const targetWidth = getSlotWidth(sizes) * (window.devicePixelRatio || 1);
  const match = candidates.find(candidate => candidate.width >= targetWidth);

  return (match || candidates[candidates.length - 1]).src;
}
