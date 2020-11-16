import { fromEvent, Subject } from 'rxjs';
import {
  map, throttleTime
} from 'rxjs/operators';
import { useState, useEffect } from 'react';


const useMousePos = ($dom) => {
  const [pos, setPos] = useState({x: 0, y: 0});
  const move$  = fromEvent($dom || document, 'mousemove', {
    capture: false,
  }, false);
  const pos$ = move$.pipe(
    map(({pageX: x, pageY: y}) => {
      return { x, y };
    })
  );

  useEffect(() => {
    const sub = pos$.subscribe(p => {
      setPos(p)
    });
    return () => sub.unsubscribe();
  }, []);
  return pos;
};

export default useMousePos;
