import { promiseOneByOne, $ } from "@zhoujiahao/utils"

export default async function() {
  if(!window.Terminal) {
    return false;
  }

  const installVendors = async () => {
    await import(/* webpackPrefetch: true */ '@zhoujiahao/blog/dist/vendors~main');
    const $linkToBlog = $('.link-to-blog');
    $linkToBlog.classList.add('command');
  };

  const installBasicCmd = async () => {
    const {default: commands} = await import('../basic-cmd/');
    window.Terminal.addCommands(commands);
  };

  const installBlog = async () => {
    const {default: blog} = await import('@zhoujiahao/blog');
    window.Terminal.addCommands({blog});
  };

  const installEditor = async () => {
    const {default: edit} = await import('@zhoujiahao/editor');
    window.Terminal.addCommands({edit});
  };

  return promiseOneByOne([
    installVendors,
    installBasicCmd,
    installBlog,
    installEditor
  ], (step) => {
    console.log('step', step, 'DONE');
  })
}