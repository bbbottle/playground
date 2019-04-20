import {link} from '../utils/tplutil';

export default function () {
    let githubLink = link('github', 'https://github.com/zjhou');
    return 'zjh, 男 | 前端开发 | ' + githubLink;
}