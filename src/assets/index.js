import { renderZjhDotIm } from '@bbbottle/zjh.im';

renderZjhDotIm(
  document.getElementById('gui')
);

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('👍', 'beforeinstallprompt', event);
  event.userChoice.then((result) => {
    console.log('👍', 'userChoice', result);
  });
});
