import { el, setChildren } from 'redom';
import './loader.css';

export function loader() {
    const loaderBackground = el('div.loader-background'),
        loader = el('div.loader');

    setChildren(loaderBackground, loader);

    return loaderBackground;
}
