import {req, format, reqAndCache} from '@zhoujiahao/utils';
import {api} from './constants';

const getPost= () => {
    return reqAndCache(api.posts, 'GET');
};

const getPostById = (id) => {
    return reqAndCache(format(api.post, id), 'GET');
};

const getPostTitles = async () => {
    const posts = await getPost();
    return posts.map(({title}) => title).join(' ');
};

const execCmdRemote = (cmd) => {
    return req(format(api.exec, cmd), 'GET');
};

export {getPost, getPostTitles, getPostById, execCmdRemote};
