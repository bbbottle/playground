import { fromEvent, Subject, interval } from 'rxjs';
import {
  map,
  bufferCount,
  distinctUntilChanged,
  debounce,
  filter
} from 'rxjs/operators';
import { useState, useEffect } from 'react';

const useScrollDirection = ($dom) => {
  const [dir, setDir] = useState('up');
  const scroll$  = fromEvent($dom || window, 'scroll', {
    capture: true
  });
  const scrollDirChanged$ = scroll$.pipe(
    map(e => e.target.scrollTop),
    bufferCount(2),
    filter(([pre, nxt]) => Math.abs(pre - nxt) > 50),
    map(([pre, nxt]) => pre - nxt > 0 ? 'UP' : 'DOWN'),
    distinctUntilChanged(),
    debounce(() => interval(300))
  );

  useEffect(() => {
    const sub = scrollDirChanged$.subscribe(d => {
      setDir(d)
    });
    return () => sub.unsubscribe();
  }, []);
  return [dir];
};

export default useScrollDirection;
