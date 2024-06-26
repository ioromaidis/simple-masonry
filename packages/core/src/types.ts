export interface SimpleMasonryOptions {
  container: HTMLElement;
  items: MasonryItem[];
  imgHeight?: number;
  gutter?: number;
}

export interface MasonryItem {
  imageSrc: string;
  meta?: any;
}

export interface EnrichedMasonryItem extends MasonryItem {
  css: Record<string, number | string>;
}
