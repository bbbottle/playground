import showdown from 'showdown';
import '../../style/markdown.css';
import {docTpl} from '../utils';
let converter = new showdown.Converter({
    openLinksInNewWindow: true,
    simpleLineBreaks: true
});
converter.setFlavor('github');
window.converter = converter;

const doc = docTpl('tohtml -- parse markdown into html format', 'tohtml [markdown string]', 'NULL');
export default {
    handler: function (paramsObject, cmdSet, $terminal, {restParams, fromPipe}) {
        let wrapper = (content) =>
          `<div class="markdown-body">${content}</div>`;

        return {html: wrapper(converter.makeHtml(fromPipe || restParams))};
    },
    doc
};