import {docTpl} from '@zhoujiahao/utils';
import {fetchNoteContent} from '@zhoujiahao/notebook'

const desc = 'fetchnote - 获取 github 仓库 zjhou/notes/_posts 下的文件';

const doc = docTpl('fetchnote', 'fetchnote <filePath>', desc);
export default {
  doc,
  async handler(paramObj, cmdSet, $terminal, {restParams: noteName}) {
    return fetchNoteContent(noteName);
  }
};