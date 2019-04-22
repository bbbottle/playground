import {docTpl} from '@zhoujiahao/utils';
import {deleteNote} from '@zhoujiahao/notebook'

const desc = 'deletenote - 删除 github 仓库 zjhou/notes/_posts 下的文件';

const doc = docTpl('deletenote', 'fetchnote <filePath>', desc);
export default {
  doc,
  async handler(paramObj, cmdSet, $terminal, {restParams: noteName}) {
    if (!noteName) {
      throw '请输入准确的文件名';
    }
    else {
      return deleteNote(noteName);
    }
  }
};