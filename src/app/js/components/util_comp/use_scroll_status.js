import { fromEvent } from 'rxjs';
import {
  map,
  distinctUntilChanged,
} from 'rxjs/operators';
import { useState, useEffect } from 'react';

const useScrollStatus = ($dom, bufferDistance) => {
  const [isHitBottom, setStatus] = useState(false);
  const scroll$  = fromEvent($dom || document, 'scroll');
  const hitBottomStatusChanged$ = scroll$.pipe(
    map(e => {
      const $obj = e.target;
      if (bufferDistance) {
        return $obj.scrollTop >= ($obj.scrollHeight - $obj.offsetHeight) - bufferDistance;
      }
      return $obj.scrollTop === ($obj.scrollHeight - $obj.offsetHeight)
    }),
    distinctUntilChanged()
  );

  useEffect(() => {
    const sub = hitBottomStatusChanged$.subscribe(s => {
      setStatus(s)
    });
    return () => sub.unsubscribe();
  }, []);
  return [isHitBottom];
};

export default useScrollStatus;
