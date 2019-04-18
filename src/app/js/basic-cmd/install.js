import {docTpl} from '@zhoujiahao/utils';

const desc =
    `install - 安装默认命令，列出命令等
        install           安装默认命令
        install -l        列出可安装的额外命令
        install <cmdName> 安装指定命令`;

const doc = docTpl('install', 'install [-l | <cmdName>]', desc);

export default {
  doc,
  shortopts: 'l',
  handler:  async (paramsObj, cmdSet, $terminal, {restParams: cmdName}) => {
    let isNoParams = !paramsObj.l && !cmdName;

    if(isNoParams) {
      const {default: commands} = await import('../basic-cmd');
      window.Terminal.addCommands(commands);
      return Promise.resolve('成功安装命令，可输入 help 查看');
    } else {
      switch (cmdName) {
        case 'gui' : {
          const {default: gui} = await import('@zhoujiahao/blog');
          window.Terminal.addCommands({gui});
          break;
        }
        default:
          return '';
      }
    }
    return '';
  }
};

