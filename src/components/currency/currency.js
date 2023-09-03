import { el, setChildren } from 'redom';
import { greenArrow, vector } from '../svg';
import { currencyBuy } from '../api';
import './currency.css';
import { renderСurrency, animationNotification } from '../other.js';
import { createNotification } from '../notification/notification';

export function currencyExchange({ ETH, BTC, JPY, USD, RUB, BYR }) {
    const data = [ETH, BTC, JPY, USD, RUB, BYR];

    const section = el('section.currency'),
        container = el('div.container'),
        title = el('h1.title.title_main.currency-title', 'Валютный обмен'),
        wrapper = el('div.currency-wrapper'),
        wrapperLeft = el('div.wrapper-left'),
        wrapperRight = el('div.wrapper-right'),
        wrapperCurrencies = el('div.currency-block'),
        currencyTitle = el('h3.title.title-currency', 'Ваши валюты'),
        currencyList = el('ul.list'),
        itemETH = el(
            'li.item.currency-item',
            el('span.item-title', `${ETH.code}`),
            el('span.item-border'),
            el('span.item-amount', `${ETH.amount}`)
        ),
        itemBTC = el(
            'li.item.currency-item',
            el('span.item-title', `${BTC.code}`),
            el('span.item-border'),
            el('span.item-amount', `${BTC.amount}`)
        ),
        itemJPY = el(
            'li.item.currency-item',
            el('span.item-title', `${JPY.code}`),
            el('span.item-border'),
            el('span.item-amount', `${renderСurrency(JPY.amount)}`)
        ),
        itemUSD = el(
            'li.item.currency-item',
            el('span.item-title', `${USD.code}`),
            el('span.item-border'),
            el('span.item-amount', `${renderСurrency(USD.amount)}`)
        ),
        itemRUB = el(
            'li.item.currency-item',
            el('span.item-title', `${RUB.code}`),
            el('span.item-border'),
            el('span.item-amount', `${renderСurrency(RUB.amount)}`)
        ),
        itemBYR = el(
            'li.item.currency-item',
            el('span.item-title', `${BYR.code}`),
            el('span.item-border'),
            el('span.item-amount', `${renderСurrency(BYR.amount)}`)
        ),
        wrapperExchange = el('div.exchange-block'),
        errorWrapper = el('div.error-wrapper'),
        exchangeTitle = el('h3.title.title-exchange', 'Обмен валюты'),
        exchangeContent = el('div.exchange-content'),
        exchangeContentLeft = el('div.exchange-content-left'),
        fromLabel = el('div.currency-label'),
        fromSpan = el('span.currency-text', 'Из'),
        fromDropdown = el('div.currency-dropdown.from-dropdown'),
        fromDropdownBtn = el('btn.currency-dropdown-btn.from-dropdown-btn'),
        fromText = el('span.currency-text', `${data[0].code}`),
        fromIcon = el('span.currency-icon'),
        fromDropWrapper = el(
            'div.currency-dropdown-wrapper.from-dropdown-wrapper'
        ),
        toLabel = el('div.currency-label'),
        toSpan = el('span.currency-text', 'В'),
        toDropdown = el('div.currency-dropdown.to-dropdown'),
        toDropdownBtn = el('btn.currency-dropdown-btn.to-dropdown-btn'),
        toText = el('span.currency-text', `${data[1].code}`),
        toIcon = el('span.currency-icon'),
        toDropWrapper = el('div.currency-dropdown-wrapper.to-dropdown-wrapper'),
        sumLabel = el('div.currency-label'),
        sumSpan = el('span.currency-text.sum-text', 'Сумма'),
        sumInput = el('input.inp'),
        exchangeBtn = el('button.btn.exchange-btn', 'Обменять'),
        courseWrapper = el('div.course-block'),
        coureseTitle = el(
            'h3.title.course-title',
            'Изменение курсов в реальном времени'
        ),
        courseList = el('ul.list.course-list');

    fromIcon.innerHTML = vector;
    toIcon.innerHTML = vector;
    fromDropdownBtn.append(fromText, fromIcon);
    toDropdownBtn.append(toText, toIcon);

    fromDropdownBtn.addEventListener('click', () => {
        fromDropWrapper.classList.toggle('open');
        fromIcon.classList.toggle('open');
    });

    toDropdownBtn.addEventListener('click', () => {
        toDropWrapper.classList.toggle('open');
        toIcon.classList.toggle('open');
    });

    data.forEach((el) => {
        createDropItem(el, fromDropWrapper, 'from-dropdown', fromDropdownBtn);
    });

    data.forEach((el) => {
        createDropItem(el, toDropWrapper, 'to-dropdown', toDropdownBtn);
    });

    function createDropItem(element, container, str, btn) {
        const item = el(
            `div.currency-dropdown-item.${str}-item`,
            `${element.code}`
        );

        item.addEventListener('click', () => {
            btn.children[0].textContent = item.textContent;
            container.classList.remove('open');
            btn.children[1].classList.remove('open');
        });

        container.append(item);
    }

    exchangeBtn.addEventListener('click', async () => {
        try {
            if (sumInput.value == '') {
                throw new Error('Введите сумму');
            }

            if (fromText.textContent === toText.textContent) {
                throw new Error('Выберите разные валюты');
            }

            const res = await currencyBuy(
                JSON.parse(sessionStorage.getItem('token')).token,
                fromText.textContent,
                toText.textContent,
                sumInput.value
            );

            if (res.error != '') {
                throw new Error(`${res.error}`);
            }

            sumInput.value = '';

            const item = createNotification('Обмен прошел успешно', 'success');

            animationNotification(errorWrapper, item);
        } catch (error) {
            const item = createNotification(error.message);

            animationNotification(errorWrapper, item);
        }
    });

    setChildren(section, [container, errorWrapper]);
    setChildren(container, [title, wrapper]);
    setChildren(wrapper, [wrapperLeft, wrapperRight]);
    setChildren(wrapperLeft, [wrapperCurrencies, wrapperExchange]);
    setChildren(wrapperRight, courseWrapper);
    setChildren(courseWrapper, [coureseTitle, courseList]);
    setChildren(wrapperCurrencies, [currencyTitle, currencyList]);
    setChildren(currencyList, [
        itemETH,
        itemBTC,
        itemJPY,
        itemUSD,
        itemRUB,
        itemBYR,
    ]);
    setChildren(wrapperExchange, [exchangeTitle, exchangeContent]);
    setChildren(exchangeContent, [exchangeContentLeft, exchangeBtn]);
    setChildren(exchangeContentLeft, [fromLabel, toLabel, sumLabel]);
    setChildren(fromLabel, [fromSpan, fromDropdown]);
    setChildren(fromDropdown, [fromDropdownBtn, fromDropWrapper]);
    setChildren(toLabel, [toSpan, toDropdown]);
    setChildren(toDropdown, [toDropdownBtn, toDropWrapper]);
    setChildren(sumLabel, [sumSpan, sumInput]);

    return section;
}

export function appendCurrencyItem(data) {
    const container = document.querySelector('.course-list');

    const item = el('li.item.currency-item'),
        title = el('span.item-title', `${data.from}/${data.to}`),
        border = el('span.item-border'),
        amount = el('span.item-amount.item-amount_red', `${data.rate}`),
        icon = el('span');

    icon.innerHTML = greenArrow;
    setChildren(item, [title, border, amount, icon]);

    if (data.change == -1) {
        item.classList.add('fall');
    }

    if (container.childElementCount >= 11) {
        container.children[0].remove();
    }

    container.append(item);
}
