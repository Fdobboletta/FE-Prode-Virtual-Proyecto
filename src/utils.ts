export const nonNullable = <T>(x: T): x is NonNullable<T> =>
  x !== null && x !== undefined;

export const toRem = (pixels: number, pixelVsRem = 16): string =>
  `${pixels / pixelVsRem}rem`;
