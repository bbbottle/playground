import { promiseOneByOne, $ } from "@zhoujiahao/utils"
import stepIndicator from '../widgets/stepIndicator/'

export default async function(p1, p2, p3, p4, print) {
  if(!window.Terminal) {
    return false;
  }

  const installBasicCmd = async () => {
    const {default: commands} = await import('@zhoujiahao/commands');
    window.Terminal.addCommands(commands);
  };

  const installEditor = async () => {
    const {default: edit} = await import('@zhoujiahao/editor');
    window.Terminal.addCommands({edit});
  };

  const installBlog = async () => {
    const {default: blog} = await import('@zhoujiahao/blog');
    window.Terminal.addCommands({blog});
  };

  const promiseQueue = [
    {
      action: installBasicCmd,
      desc: "安装基本命令...",
    }, {
      action: installBlog,
      desc: "安装博客..."
    },
  ];

  /* const indicator = stepIndicator({
    totalStep: promiseQueue.length,
    indicatorColor: '#d6d6d6',
    indicatorHighlightColor: 'rgba(253, 165, 142, 0.8784313725490196)',
    x: 'center',
    y: 'calc(40% + 62px)',
  }); */
  const log = (step) => {print(promiseQueue[step].desc, true)};
  return promiseOneByOne(
    promiseQueue.map(({action}) => action), log).then(() => {
      print("完成。", true);
  })
}