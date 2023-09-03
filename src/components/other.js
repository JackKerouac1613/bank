import { setChildren } from 'redom';

export function renderСurrency(n) {
    n = Math.round(n);
    n = String(n).replace('.', '');
    n = Number(n);
    n += '';
    n = new Array(4 - (n.length % 3)).join('U') + n;
    return n.replace(/([0-9U]{3})/g, '$1 ').replace(/U/g, '');
}

export function animationNotification(container, el) {
    setChildren(container, el);

    setTimeout(() => {
        el.classList.add('animation-notification');
    }, 1);

    setTimeout(() => {
        el.remove();
    }, 3000);
}
