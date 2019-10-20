import {$, isMobile} from '@zhoujiahao/utils';
import preInstall from './preInstall';

import 'style/index.scss';
const init = async () => {
  const {default: PseudoTerminal} = await import('@zhoujiahao/terminal');
  const Terminal = PseudoTerminal($('#terminal'), {
    // background: 'rgba(253, 165, 142, 0.8784313725490196)',
    // color: '#fff',
    // cursorColor: '#fff',
  });
  window.Terminal = Terminal;

  document.addEventListener('click', function (evt) {
    let isCommand = Array.from(evt.target.classList).includes('command');
    if (!isCommand) return;

    let command = evt.target.getAttribute('data-cmd');
    let isMulti = evt.target.hasAttribute('multi');
    let toExec = isMulti ? command.split(/\s*&&\s*/) : command;
    let execFn = isMulti
      ? 'humanizerExecCmdArr'
      : 'humanizerExec';

    evt.target.classList.remove('command');
    Terminal[execFn](toExec).then(() => {
      evt.target.classList.add('command');
    });
  });

  Terminal.addCommands({preInstall});
  await Terminal.humanizerExec('preInstall');

  if (isMobile()) {
    return Terminal.humanizerExecCmdArr(['blog', 'exit']);
  }
};

init().then(() => {
  if (!isMobile()) {
    $(".commands").classList.add('show');
  }
});
