import { useState, useMemo, useEffect } from 'react';
import { intervalToDuration, subSeconds, compareAsc } from 'date-fns';

export function useCountdown(date: Date): object {
    const [time, setTime] = useState(new Date());

    const countdown = useMemo(
        () =>
            intervalToDuration({
                start: date,
                end: new Date(),
            }),
        [time]
    );

    useEffect(()=>{let interval = setInterval(() => {
        if (compareAsc(date, new Date()) <= 0) {
          clearInterval(interval);
          setTime(new Date());
        } else {
          setTime(subSeconds(time, 1));
        }
      }, 1000);
      return () => clearInterval(interval);
    }, []);

    return {countdown};
}