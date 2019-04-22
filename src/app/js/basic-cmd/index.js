import about from './about';
import ls from './ls';
import tohtml from './tohtml';
import cat from './cat';
import {MOON_URL} from '../constants/strVar';
import fetchnote from './fetchNote';
import deletenote from './deleteNote';
import {goto} from '@zhoujiahao/utils/';

const commands = {
    moon: () => {goto(MOON_URL);},
    about,
    ls,
    cat,
    deletenote,
    tohtml,
    fetchnote,
    exit: () => {window.Terminal.destroy()},
};

export default commands;
