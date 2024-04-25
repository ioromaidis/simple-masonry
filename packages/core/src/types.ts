export interface SimpleMasonryOptions {
  container: HTMLElement;
  items: MasonryItem[];
  imgHeight?: number;
  spacing?: number;
}

export interface MasonryItem {
  image: string;
  meta?: any;
}

export interface EnrichedMasonryItem extends MasonryItem {
  css: Record<string, number | string>;
}
