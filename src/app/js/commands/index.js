import about from './about';
import ls from './ls';
// import tohtml from './tohtml';
import cat from './cat';
import {MOON_URL} from '../constants/strVar';
import {goto} from '../utils';

const commands = {
    about,
    moon: () => {goto(MOON_URL);},
    ls,
    cat,
    // tohtml
};

export default commands;