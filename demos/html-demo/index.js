import SimpleMasonry from '@simple-masonry/core';

const items = [
  {
    imageSrc: 'https://placehold.co/600x400',
  },
  {
    imageSrc: 'https://placehold.co/900x500',
  },
  {
    imageSrc: 'https://placehold.co/300x500',
  },

  {
    imageSrc: 'https://placehold.co/300x500',
  },
  {
    imageSrc: 'https://placehold.co/200x600',
  },
];

let container = document.querySelector('#masonry');

const masonryItems = SimpleMasonry.createMasonry({
  container,
  items,
  imgHeight: 250,
}).then((items) => {
  const string = items.map(
    ({ imageSrc, css: { height, width, position, left, top, objectFit } }) =>
      `<img src="${imageSrc}" style="display:block;position:${position};object-fit:${objectFit};left:${left}px;top:${top}px;width:${width}px;height:${height}px">`
  );

  container.innerHTML = string;
});
