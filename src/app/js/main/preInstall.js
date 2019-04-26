import { promiseOneByOne, $ } from "@zhoujiahao/utils"
import stepIndicator from '../widgets/stepIndicator/'

export default async function() {
  if(!window.Terminal) {
    return false;
  }

  const installVendors = async () => {
    await import(/* webpackPrefetch: true */ '@zhoujiahao/blog/dist/vendors~main');
    const $linkToBlog = $('.link-to-blog');
    if (!$linkToBlog) {
      return;
    }
    $linkToBlog.classList.add('command');
  };

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
    installVendors,
    installBasicCmd,
    installEditor,
    installBlog,
  ];

  const indicator = stepIndicator({
    totalStep: promiseQueue.length,
    indicatorColor: '#ccc',
    x: 'center',
    y: 'calc(40% + 62px)',
  });

  return promiseOneByOne(promiseQueue, indicator.highlightStep).then(indicator.destroy)
}