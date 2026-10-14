// Composites a certificate into a 16:10 "credential viewer" screen so it can
// be shown on the laptop model without stretching. Browser only.

// Layout coordinates are in a 1600x1000 space, drawn at 80% so there are fewer
// pixels to paint and encode; that is still sharp at the laptop's screen size
const SCREEN_WIDTH = 1600;
const SCREEN_HEIGHT = 1000;
const OUTPUT_SCALE = 0.8;
const screenCache = new Map();

const colors = {
  ink: '#0a0b16',
  inkRaised: '#14162a',
  text: '#f3f5fb',
  muted: 'rgba(243, 245, 251, 0.56)',
  faint: 'rgba(243, 245, 251, 0.12)',
  lime: '#c3f344',
  violet: '#a177ff',
};

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

function roundedRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.roundRect(x, y, width, height, radius);
}

function wrapText(context, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let line = '';

  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function drawChrome(context, cert) {
  // Backdrop with brand-tinted light
  const base = context.createLinearGradient(0, 0, 0, SCREEN_HEIGHT);
  base.addColorStop(0, colors.inkRaised);
  base.addColorStop(1, colors.ink);
  context.fillStyle = base;
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  const violetGlow = context.createRadialGradient(1300, 120, 0, 1300, 120, 900);
  violetGlow.addColorStop(0, 'rgba(161, 119, 255, 0.28)');
  violetGlow.addColorStop(1, 'rgba(161, 119, 255, 0)');
  context.fillStyle = violetGlow;
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  const limeGlow = context.createRadialGradient(200, 980, 0, 200, 980, 700);
  limeGlow.addColorStop(0, 'rgba(195, 243, 68, 0.12)');
  limeGlow.addColorStop(1, 'rgba(195, 243, 68, 0)');
  context.fillStyle = limeGlow;
  context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

  // Title bar
  context.fillStyle = 'rgba(255, 255, 255, 0.04)';
  context.fillRect(0, 0, SCREEN_WIDTH, 76);
  context.fillStyle = colors.faint;
  context.fillRect(0, 76, SCREEN_WIDTH, 2);

  [0, 1, 2].forEach(index => {
    context.beginPath();
    context.arc(52 + index * 30, 38, 8, 0, Math.PI * 2);
    context.fillStyle = index === 0 ? colors.lime : colors.faint;
    context.fill();
  });

  context.font = '500 24px "JetBrains Mono", monospace';
  context.fillStyle = colors.muted;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(`credentials / ${cert.id}`, SCREEN_WIDTH / 2, 39);

  // Status pill
  const label = cert.verifyUrl ? 'VERIFIABLE' : 'ISSUED';
  context.font = '500 20px "JetBrains Mono", monospace';
  const pillWidth = context.measureText(label).width + 44;
  const pillX = SCREEN_WIDTH - 40 - pillWidth;
  roundedRect(context, pillX, 20, pillWidth, 38, 19);

  if (cert.verifyUrl) {
    context.fillStyle = colors.lime;
    context.fill();
    context.fillStyle = colors.ink;
  } else {
    context.strokeStyle = 'rgba(243, 245, 251, 0.3)';
    context.lineWidth = 2;
    context.stroke();
    context.fillStyle = colors.muted;
  }

  context.fillText(label, pillX + pillWidth / 2, 40);

  // Footer status line
  context.textAlign = 'left';
  context.font = '400 22px "JetBrains Mono", monospace';
  context.fillStyle = colors.muted;
  context.fillText(`issued ${cert.issued}`, 48, SCREEN_HEIGHT - 34);
  context.textAlign = 'right';
  context.fillText(
    [cert.issuer, cert.partner].filter(Boolean).join(' · '),
    SCREEN_WIDTH - 48,
    SCREEN_HEIGHT - 34
  );
}

function drawCertificate(context, image, x, y, width, height) {
  context.save();
  context.shadowColor = 'rgba(0, 0, 0, 0.55)';
  context.shadowBlur = 60;
  context.shadowOffsetY = 24;
  roundedRect(context, x, y, width, height, 14);
  context.fillStyle = '#ffffff';
  context.fill();
  context.restore();

  context.save();
  roundedRect(context, x, y, width, height, 14);
  context.clip();
  context.drawImage(image, x, y, width, height);
  context.restore();
}

async function composeScreen(cert) {
  await Promise.all([
    document.fonts?.load('600 64px "Space Grotesk"'),
    document.fonts?.load('500 24px "JetBrains Mono"'),
  ]).catch(() => {});

  const image = await loadImage(cert.image);
  const canvas = document.createElement('canvas');
  canvas.width = SCREEN_WIDTH * OUTPUT_SCALE;
  canvas.height = SCREEN_HEIGHT * OUTPUT_SCALE;
  const context = canvas.getContext('2d');
  context.scale(OUTPUT_SCALE, OUTPUT_SCALE);

  drawChrome(context, cert);

  const contentTop = 120;
  const contentBottom = SCREEN_HEIGHT - 84;
  const contentHeight = contentBottom - contentTop;
  const aspect = image.naturalWidth / image.naturalHeight;

  if (aspect >= 1) {
    // Landscape: centre the certificate
    const maxWidth = SCREEN_WIDTH - 240;
    let height = contentHeight;
    let width = height * aspect;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspect;
    }

    const x = (SCREEN_WIDTH - width) / 2;
    const y = contentTop + (contentHeight - height) / 2;
    drawCertificate(context, image, x, y, width, height);
  } else {
    // Portrait: certificate on the right, details set as type on the left
    const height = contentHeight;
    const width = height * aspect;
    const x = SCREEN_WIDTH - 120 - width;
    drawCertificate(context, image, x, contentTop, width, height);

    const textX = 120;
    const textWidth = x - textX - 80;
    context.textAlign = 'left';
    context.textBaseline = 'alphabetic';

    context.font = '500 24px "JetBrains Mono", monospace';
    context.fillStyle = colors.lime;
    context.fillText(cert.credential.toUpperCase(), textX, 330);

    context.font = '600 68px "Space Grotesk", sans-serif';
    context.fillStyle = colors.text;
    const lines = wrapText(context, cert.title, textWidth);
    lines.forEach((line, index) => {
      context.fillText(line, textX, 420 + index * 78);
    });

    const afterTitle = 420 + lines.length * 78 + 24;
    context.fillStyle = colors.violet;
    context.fillRect(textX, afterTitle, 72, 6);

    context.font = '400 32px "Space Grotesk", sans-serif';
    context.fillStyle = colors.muted;
    context.fillText(
      [cert.issuer, cert.partner].filter(Boolean).join(' · '),
      textX,
      afterTitle + 70
    );
  }

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92));
  return URL.createObjectURL(blob);
}

/**
 * Returns an object URL for the composited screen, cached per certificate
 */
export function getCredentialScreen(cert) {
  if (!screenCache.has(cert.id)) {
    const promise = composeScreen(cert).catch(error => {
      screenCache.delete(cert.id);
      throw error;
    });
    screenCache.set(cert.id, promise);
  }

  return screenCache.get(cert.id);
}

export const credentialScreenSize = {
  width: SCREEN_WIDTH * OUTPUT_SCALE,
  height: SCREEN_HEIGHT * OUTPUT_SCALE,
};
