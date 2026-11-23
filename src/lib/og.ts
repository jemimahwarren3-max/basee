// Renders an Open Graph card as an SVG and converts to PNG with sharp.
//
// Trade-off: no bundled font. The rasterizer (librsvg via sharp) uses a system
// font. The output is consistent enough for a social card but not pixel-perfect
// across hosts. For branded, pixel-perfect cards, swap in satori + a bundled
// font — see CLAUDE.md.
import sharp from 'sharp';
import { getFamily } from '../design-families';

export interface OgInput {
  title: string;
  subtitle?: string;
  brand?: string;
  family?: string;
  width?: number;
  height?: number;
}

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function wrap(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = '';
  for (const w of words) {
    const candidate = line ? `${line} ${w}` : w;
    if (candidate.length > maxChars) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 3);
}

export async function renderOgImage(input: OgInput): Promise<Buffer> {
  const { title, subtitle, brand, family: familyId, width = 1200, height = 630 } = input;
  const colors = familyId ? getFamily(familyId).colors : null;
  const bg = colors?.background ?? '#0b0b0b';
  const fg = colors?.foreground ?? '#f5f5f5';
  const accent = colors?.accent ?? '#999';

  const titleLines = wrap(title, 28);
  const titleStart = subtitle ? 240 : 290;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect x="0" y="${height - 12}" width="100%" height="12" fill="${accent}"/>
  ${brand ? `<text x="80" y="110" font-family="sans-serif" font-size="28" font-weight="600" fill="${accent}" letter-spacing="4">${esc(brand.toUpperCase())}</text>` : ''}
  ${titleLines
    .map(
      (line, i) =>
        `<text x="80" y="${titleStart + i * 92}" font-family="sans-serif" font-size="78" font-weight="700" fill="${fg}">${esc(line)}</text>`,
    )
    .join('')}
  ${subtitle ? `<text x="80" y="${titleStart + titleLines.length * 92 + 60}" font-family="sans-serif" font-size="30" fill="${fg}" opacity="0.7">${esc(subtitle)}</text>` : ''}
</svg>`;

  return sharp(Buffer.from(svg)).png().toBuffer();
}
