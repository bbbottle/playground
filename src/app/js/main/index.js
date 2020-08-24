import { $ } from '@zhoujiahao/utils';
import 'style/index.scss';
import 'style/markdown.scss';
import { pagesBuilder } from "../components/";

const init = async () => {
  const { default: renderBlogAt } = await import('@zhoujiahao/blog');
  const mountDom = $('#gui');
  return renderBlogAt(mountDom, { pagesBuilder });
};

init().then(() => {
  console.log('loaded');
});
