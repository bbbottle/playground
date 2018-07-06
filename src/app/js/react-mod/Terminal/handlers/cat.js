import {getImage} from '../../../common-mod/Utils';
import showdown from 'showdown';
import * as Tpl from '../../../common-mod/Template';
import * as BlogApi from '../../../common-mod/BlogAPI';
import '../markdown.css';
import intl from 'react-intl-universal';

const Converter = new showdown.Converter();
Converter.setFlavor('github');
const catHandler = (terminal, params) => {
    if (!params[0]) {
        if (window.cache.titles.length && terminal.cmdName === 'random') {
            params[0] = window.cache.titles.randEle();
        }
        else {
            terminal.next();
            return;
        }
    }

    let filt = data => params =>
        data.filter(content => content.title === params[0])[0];

    let handleData = (data) => {
        if (
            data.type === 'blog_post' ||
            data.type === 'love_letter'
        ) {
            return Promise.resolve([data]);
        }
        else if (data.type === 'image') {
            return getImage(data.url)
                .then(ele => {
                    return Promise.resolve([data, ele]);
                }).catch(() => {
                    throw 'Failed to get image';
                });
        }
    };

    let showData = (data) => {
        terminal.loading(false);
        if (
            data[0].type === 'blog_post' ||
            data[0].type === 'love_letter'
        ) {
            terminal.output('', '', 'markdown-body').innerHTML = Converter.makeHtml(data[0].content);
        }
        else if (data[0].type === 'image') {
            terminal
                .output(Tpl.imageT(data[0]), 'overwrite')
                .appendChild(data[1]);
        }
        terminal.next();
    };

    terminal.loading(true);
    BlogApi
        .getAllContent()
        .then(data => {
            let target = filt(data)(params);
            if (!target) {
                return Promise.reject('404');
            }
            return Promise.resolve(target);
        })
        .then(data => {
            return BlogApi.getContent(data);
        })
        .then(data => {
            return handleData(data[0]);
        })
        .then(showData)
        .catch(err => {
            terminal.loading(false);
            if (typeof err === 'string') {
                terminal.output(err);
            }
            else {
                terminal.output(intl.get('error.unknown'));
            }
            terminal.next();
        });
};

const catDoc = `
    NAME: 
        cat - print post content
    
    SYNOPSIS: 
        cat &lt;post name&gt;`;

export default {
    doc: catDoc,
    handler: catHandler
};
