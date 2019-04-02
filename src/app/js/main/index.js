import install from '../basic-cmd/install';
import {$} from '@zhoujiahao/utils';

const init = async () => {
  const {default: PseudoTerminal} = await import('pseudoterminal');
  const Terminal = PseudoTerminal($('#terminal'));
  window.Terminal = Terminal;

  document.addEventListener('click', function (evt) {
    let isCommand = Array.from(evt.target.classList).includes('command');
    if (!isCommand) return;

    let command = evt.target.getAttribute('data-cmd');
    let isMulti = evt.target.hasAttribute('multi');
    let toExec = isMulti ? command.split(/\s*&\s*/) : command;
    let execFn = isMulti
      ? 'humanizerExecCmdArr'
      : 'humanizerExec';

    evt.target.classList.remove('command');
    Terminal[execFn](toExec).then(() => {
      evt.target.classList.add('command');
    });
  });

  await Terminal.addCommands({install});
  await Terminal.humanizerExecCmdArr([
    'install',
  ]);
  import(/* webpackPrefetch: true */ '@zhoujiahao/blog/dist/vendors~main')
    .then(() => {
      const $linkToblog = $('.link-to-blog');
      $linkToblog.classList.add('command');

      if (location.host === 'blog.zjh.im') {
        Terminal.humanizerExecCmdArr([
          'install gui',
          'gui'
        ]);

      }
    })
};

init().then();
