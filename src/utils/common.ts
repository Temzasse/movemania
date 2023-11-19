import { MutableRefObject, useEffect, useRef, useState } from 'react';

export function useInterval(
  callback: () => void,
  delay: number | null
): MutableRefObject<number | null> {
  const intervalRef = useRef<number | null>(null);
  const savedCallback = useRef<() => void>(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => savedCallback.current();

    if (typeof delay === 'number') {
      intervalRef.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalRef.current!);
    }
  }, [delay]);

  return intervalRef;
}
