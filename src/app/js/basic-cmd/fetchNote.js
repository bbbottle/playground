import {docTpl, req, store} from '@zhoujiahao/utils';

const atou = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
};

const desc = 'fetchnote - 获取 github 仓库 zjhou/notes/_posts 下的文件';

const doc = docTpl('fetchnote', 'fetchnote <filePath>', desc);
export default {
  doc,
  async handler(paramObj, cmdSet, $terminal, {restParams: noteName}) {
    const notesURL = 'https://api.github.com/repos/zjhou/notes/contents/_posts';
    let notes = store.get('notes');
    if (!notes) {
      notes = await req(notesURL, 'GET');
      store.set('notes', notes);
    }
    const notesNameArr = notes.map(({name}) => name.toLowerCase());
    const targetNote = notesNameArr.filter(candi => {
      return candi.includes(noteName.toLowerCase());
    });
    const noteURL = `${notesURL}/${targetNote}`;
    const encodedNote = await req(
      noteURL,
      'GET'
    );
    return atou(encodedNote.content);
  }
};