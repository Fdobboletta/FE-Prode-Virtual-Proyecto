import { createContext, useContext } from 'react';

export const nonNullable = <T>(x: T): x is NonNullable<T> =>
  x !== null && x !== undefined;

export const toRem = (pixels: number, pixelVsRem = 16): string =>
  `${pixels / pixelVsRem}rem`;

/**
 * Create typed Context and Provider with no upfront default value.
 *
 * Lifted from https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/#extended-example
 */
export const createTypedContext = <A extends unknown | null>(): readonly [
  () => A,
  React.Provider<A | undefined>
] => {
  const context = createContext<A | undefined>(undefined);

  const useTypedContext = () => {
    const c = useContext(context);
    if (c === undefined)
      throw new Error('useTypedContext must be inside a Provider with a value');
    return c;
  };

  return [useTypedContext, context.Provider] as const;
};
