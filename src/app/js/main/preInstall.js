import { promiseOneByOne, $ } from "@zhoujiahao/utils"
import stepIndicator from '../widgets/stepIndicator/'

export default async function() {
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
    installBasicCmd,
    installEditor,
    installBlog,
  ];

  const indicator = stepIndicator({
    totalStep: promiseQueue.length,
    indicatorColor: '#d6d6d6',
    indicatorHighlightColor: 'rgba(253, 165, 142, 0.8784313725490196)',
    x: 'center',
    y: 'calc(40% + 62px)',
  });

  return promiseOneByOne(promiseQueue, indicator.highlightStep).then(indicator.destroy)
}