import { fromEvent, Subject, interval } from 'rxjs';
import {
  map, distinctUntilChanged, throttle
} from 'rxjs/operators';

import { useState, useEffect } from 'react';

const isElementClickable = (element) => {
  const InteractiveTags = new Set([
    'IMG',
    'A',
    'BUTTON',
    'LI',
    'IFRAME',
    'INPUT'
  ]);

  const ClickableClassNames = [
    'panel-title',
    'title',
    'clickable'
  ];

  const isEleHasClickableCls = (ele) => {
    return ClickableClassNames.reduce((pre, current) => {
      return pre || ele.classList.contains(current)
    }, false)
  }

  if (isEleHasClickableCls(element)) {
    return true;
  }

  if (InteractiveTags.has(element.tagName)) {
    return true;
  }

  return false;
}

const waitTime = 300;

const useElementClickable = () => {
  const [clickable, setClickable] = useState(false);
  const move$  = fromEvent(document, 'mousemove')
    .pipe(throttle(() => interval(waitTime), { leading: true, trailing: true }));

  const clickable$ = move$.pipe(
    map(e => e.target),
    map(isElementClickable),
    distinctUntilChanged()
  );

  useEffect(() => {
    const sub = clickable$.subscribe(c => {
      setClickable(c)
    });
    return () => sub.unsubscribe();
  }, []);

  return clickable;
};

export default useElementClickable;
