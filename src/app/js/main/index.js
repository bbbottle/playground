import { $ } from '@zhoujiahao/utils';
import 'style/index.scss';
import 'style/markdown.scss';

const init = async () => {
  const { default: renderBlogAt } = await import('@zhoujiahao/blog');
  const mountDom = $('#gui');
  return renderBlogAt(mountDom);
};

init().then(() => {
  console.log('loaded');
});
