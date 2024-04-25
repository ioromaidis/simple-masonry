import {
  EnrichedMasonryItem,
  MasonryItem,
  SimpleMasonryOptions,
} from './types';
import { handleError } from './utils';

const DEFAULT_OPTIONS: Partial<SimpleMasonryOptions> = {
  imgHeight: 200,
  gutter: 20,
};

type Masonry = {
  createMasonry: (options: SimpleMasonryOptions) => void;
};

let containerEl: HTMLElement;
let imgHeight: number;
let gutter: number;
let items: MasonryItem[];

function loadImage(imageSrc: string) {
  return new Promise((resolve, reject) => {
    const newImage = new Image();
    newImage.onload = function () {
      resolve(this);
    };
    newImage.onerror = function () {
      reject('image load error');
    };
    newImage.src = imageSrc;
  });
}

function createLayout(images: HTMLImageElement[]): EnrichedMasonryItem[] {
  const containerBCR = containerEl.getBoundingClientRect();
  const containerWidth = containerBCR.width;
  const containerOffset = containerBCR.top;
  let rows = [];
  let rowTemp = [];
  let rowIdx = 0;
  let rowOffset = 0;
  let itemIndex = 0;

  while (itemIndex < images.length) {
    console.log({ itemIndex });
    placeInRow();
  }

  function commitInRow(width, itemIndex) {
    console.log({ width, itemIndex, rowIdx });
    const css = {
      width,
      height: imgHeight,
      left: rowOffset,
      top: rowIdx * (containerOffset + imgHeight + gutter),
      position: 'absolute',
      objectFit: 'cover',
    };

    rowTemp.push(css);
    rowOffset += width + gutter;
  }

  function commitRow() {
    rows = [...rows, ...rowTemp];
    rowTemp = [];
    rowIdx++;
    rowOffset = 0;
  }

  function placeInRow() {
    const adjustedWidth =
      (images[itemIndex].naturalWidth * imgHeight) /
      images[itemIndex].naturalHeight;
    const spaceLeft = Math.floor(containerWidth - rowOffset + gutter);
    if (spaceLeft < adjustedWidth) {
      rowOffset = 0;
      rowTemp = rowTemp.map((item, i) => {
        const padding = spaceLeft / rowTemp.length;
        let newWidth = Math.floor(item.width + padding);
        let updatedItem = {
          ...item,
          width: newWidth,
          left: Math.floor(rowOffset),
        };
        rowOffset += newWidth + gutter;

        return updatedItem;
      });
      commitRow();
    } else {
      commitInRow(adjustedWidth, itemIndex);
      itemIndex++;
    }
  }

  if (rowTemp.length) {
    commitRow();
  }

  containerEl.style.height = rowIdx * (imgHeight + gutter) + 'px';
  containerEl.style.overflow = 'hidden';

  return rows.map((css, i) => ({ ...items[i], css }));
}

async function createMasonry(
  options: SimpleMasonryOptions
): Promise<EnrichedMasonryItem[] | void> {
  assignOptions(options);

  return Promise.all(options.items.map((item) => loadImage(item.imageSrc)))
    .then(createLayout)
    .catch(handleError);
}

function assignOptions(options: SimpleMasonryOptions) {
  if (!options.container) {
    return null;
  }

  imgHeight = options.imgHeight ?? DEFAULT_OPTIONS.imgHeight;
  gutter = options.gutter ?? DEFAULT_OPTIONS.gutter;
  containerEl = options.container;
  containerEl.style.position = 'relative';
  items = options.items;
}

export default { createMasonry } as Masonry;
