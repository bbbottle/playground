import {$, isMobile} from '@zhoujiahao/utils';
import installCommands from './preInstall';

import './index.scss';
const init = async () => {
  const {default: PseudoTerminal} = await import('@zhoujiahao/terminal');
  const Terminal = PseudoTerminal($('#terminal'));
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

  installCommands().then(() => {
    console.log('commands installed on your', isMobile() ? 'mobile' : 'pc');
  })
};

init().then();
