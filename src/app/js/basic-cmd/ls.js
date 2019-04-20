import {getPost} from '../api';
import {title} from '../../tpl/post';
import {docTpl, store} from '@zhoujiahao/utils';

const doc = docTpl('ls', 'ls', 'list all post titles');
export default {
    handler: async function () {
        const posts = await getPost();
        posts.forEach(({title, _id}) => {
            store.set(title, _id);
        });
        return posts.map(title).join(' ');
    },
    doc
};