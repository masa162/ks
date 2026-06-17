export interface LayoutPattern {
  layout: 'full' | 'medium-left' | 'medium-right' | 'small-center' | 'scatter-left' | 'scatter-right' | 'pair';
  spacing: 'none' | 'small' | 'medium' | 'large' | 'huge';
  textPosition: 'overlay-top-left' | 'overlay-top-right' | 'overlay-bottom-left' | 'overlay-bottom-right' | 'side-left' | 'side-right' | 'under';
}

const LAYOUT_TEMPLATES: LayoutPattern[] = [
  { layout: 'medium-left', spacing: 'medium', textPosition: 'side-right' },
  { layout: 'scatter-right', spacing: 'large', textPosition: 'under' },
  { layout: 'pair', spacing: 'medium', textPosition: 'under' },
  { layout: 'pair', spacing: 'none', textPosition: 'under' },
  { layout: 'full', spacing: 'huge', textPosition: 'overlay-bottom-left' },
  { layout: 'medium-right', spacing: 'large', textPosition: 'side-left' },
  { layout: 'small-center', spacing: 'huge', textPosition: 'overlay-top-right' },
  { layout: 'scatter-left', spacing: 'medium', textPosition: 'under' }
];

export function getProceduralLayout(
  seriesId: string,
  order: number,
  overrides?: {
    layout?: string;
    spacing?: string;
    textPosition?: string;
  }
): LayoutPattern {
  // Compute seed hash from seriesId
  let hash = 0;
  for (let i = 0; i < seriesId.length; i++) {
    hash = seriesId.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Determine template index using deterministic math based on seed + order
  const templateIdx = Math.abs(hash + order) % LAYOUT_TEMPLATES.length;
  const template = LAYOUT_TEMPLATES[templateIdx];

  return {
    layout: (overrides?.layout || template.layout) as any,
    spacing: (overrides?.spacing || template.spacing) as any,
    textPosition: (overrides?.textPosition || template.textPosition) as any,
  };
}
