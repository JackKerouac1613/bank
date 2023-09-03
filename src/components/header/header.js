import { el, setChildren } from 'redom';
import { logo } from '../svg';
import { navigation } from '../../script';
import './header.css';

export function createHeader(nav = false, str = '') {
    const header = el('header.header'),
        container = el('div.container.header-container'),
        headerWrapper = el('div.header-wrapper'),
        imgLogo = el('span.header-logo');

    imgLogo.innerHTML = logo;

    setChildren(header, headerWrapper);
    setChildren(headerWrapper, container);
    setChildren(container, imgLogo);

    if (nav) {
        const nav = el('nav.header-nav'),
            list = el('ul.list.header-list'),
            itemATM = el(
                'li.btn.header-item',
                el('a.header-link', 'Банкоматы')
            ),
            itemAccounts = el(
                'li.btn.header-item',
                el('a.header-link', 'Счета')
            ),
            itemCurrency = el(
                'li.btn.header-item',
                el('a.header-link', 'Валюта')
            ),
            itemExit = el('li.btn.header-item', el('a.header-link', 'Выход'));

        if (str == 'account') {
            itemAccounts.classList.add('active');
        }

        if (str == 'currency') {
            itemCurrency.classList.add('active');
        }

        if (str == 'map') {
            itemATM.classList.add('active');
        }

        itemAccounts.addEventListener('click', () => {
            navigation('/accounts');
        });

        itemCurrency.addEventListener('click', () => {
            navigation('/currency');
        });

        itemATM.addEventListener('click', () => {
            navigation('/map');
        });

        setChildren(nav, list);
        setChildren(list, [itemATM, itemAccounts, itemCurrency, itemExit]);
        setChildren(container, [imgLogo, nav]);
    }

    return header;
}
