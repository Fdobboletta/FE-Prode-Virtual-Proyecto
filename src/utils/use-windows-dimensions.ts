import { useState, useEffect } from 'react';

type DimensionsType = {
  width: number;
  height: number;
};

const useWindowDimensions = (): Readonly<[DimensionsType]> => {
  const [dimensions, setDimensions] = useState<DimensionsType>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const onResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', onResize);

    onResize();

    return () => window.removeEventListener('resize', onResize);
  }, []);

  return [dimensions] as const;
};

export { useWindowDimensions };
