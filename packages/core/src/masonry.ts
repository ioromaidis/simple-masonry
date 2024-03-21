import { SimpleMasonryOptions } from './types';

const DEFAULT_OPTIONS: Partial<SimpleMasonryOptions> = {
  imgHeight: 200,
  spacing: 20,
};

type Masonry = {
  createMasonry: (options: SimpleMasonryOptions) => void;
};

let containerEl: HTMLElement;

function createMasonry(options: SimpleMasonryOptions) {
  const {
    container,
    imgHeight = DEFAULT_OPTIONS.imgHeight,
    spacing = DEFAULT_OPTIONS.spacing,
  } = options;

  if (!container) {
    return null;
  }

  containerEl = document.querySelector(container);

  console.log({ imgHeight, spacing, containerEl });
}

export default { createMasonry } as Masonry;
