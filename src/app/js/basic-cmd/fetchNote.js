import {req} from '@zhoujiahao/utils';
import {docTpl} from '@zhoujiahao/utils';

const atou = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
};

const desc = 'fetchnote - 获取 github 仓库 zjhou/notes/_posts 下的文件';

const doc = docTpl('fetchnote', 'fetchnote <filePath>', desc);
export default {
  doc,
  async handler(paramObj, cmdSet, $terminal, {restParams: noteName}) {
    const noteURL = `https://api.github.com/repos/zjhou/notes/contents/_posts/${noteName}`;
    const encodedNote = await req(
      noteURL,
      'GET'
    );
    return atou(encodedNote.content);
  }
};