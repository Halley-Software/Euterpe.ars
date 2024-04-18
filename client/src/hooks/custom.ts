import { useEffect, useRef } from 'react'

/**
 * Executes the given callback every milliseconds passed as `delay`
 * 
 * Source from: https://stackoverflow.com/a/62798382 / https://overreacted.io/making-setinterval-declarative-with-react-hooks/
 * @param callback function to execute
 * @param delay time in milliseconds
 */
export function useInterval(callback: () => void, delay: number) {
  const savedCallback = useRef<() => void>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (savedCallback.current)
        savedCallback.current();
    }

    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}