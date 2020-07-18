import 'style/index.scss';
import 'style/markdown.scss';

const init = async () => {
  const { default: blogMod } = await import('@zhoujiahao/blog');
  return blogMod.handler();
};

init().then(() => {
  console.log('loaded');
});
