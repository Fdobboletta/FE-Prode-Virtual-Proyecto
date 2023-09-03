import { useState, useEffect, useMemo } from 'react';
import { isAfter, parseISO } from 'date-fns';

type UseDateComparisonProps = {
  targetDate: string;
  interval?: number;
};

type UseDateComparisonResult = {
  currentDateTime: Date;
  isDateReached: boolean;
};

const useDateComparison = ({
  targetDate,
  interval = 1000,
}: UseDateComparisonProps): UseDateComparisonResult => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const targetDateTime = useMemo(() => parseISO(targetDate), [targetDate]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, interval);

    return () => {
      clearInterval(intervalId);
    };
  }, [interval]);

  const isDateReached = useMemo(
    () => isAfter(currentDateTime, targetDateTime),
    [currentDateTime, targetDateTime]
  );

  return { currentDateTime, isDateReached };
};

export default useDateComparison;
