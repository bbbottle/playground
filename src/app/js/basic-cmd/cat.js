import {store, docTpl} from '../utils';
import {getPostById} from '../api';

const doc = docTpl('cat', 'cat <post title>', 'show post content');

export default {
    handler: async function (paramObj, cmdSet, $terminal, {restParams: postName}) {
        const postId = store.get(postName.trim());
        if (!postId) {
          return '';
        }

        const {content} = await getPostById(postId);
        return content;
    },
    doc
};
