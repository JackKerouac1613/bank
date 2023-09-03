import { el, setChildren } from 'redom';
import { createAccount } from '../api';
import { navigation } from '../../script';
import { cross, vector, mark } from '../svg.js';
import { renderСurrency } from '../other.js';
import './account.css';

export function createAccountList(data, fn) {
    const section = el('section.account-section'),
        container = el('div.container'),
        topWrapper = el('div.top-wrapper'),
        contentLeft = el('div.account-content'),
        title = el('h1.title.title_main.account-title', 'Ваши счета'),
        dropdown = el('div.dropdown'),
        dropBtn = el('btn.dropdown-btn', 'Сортировка'),
        dropWrapper = el('div.dropdown-wrapper'),
        dropNumber = el('a.account.dropdown-item', 'По номеру'),
        dropBalance = el('a.balance.dropdown-item', 'По балансу'),
        dropTransactions = el(
            'a.transaction.dropdown-item',
            'По последней транзакции'
        ),
        iconCross = el('span.icon-cross'),
        iconVector = el('span.icon-vector'),
        btnCreate = el(
            'button.btn.account-btn.btn_create',
            `Создать новый счёт`
        ),
        listAccount = el('ul.list.account-list');

    iconCross.innerHTML = cross;
    btnCreate.append(iconCross);
    iconVector.innerHTML = vector;
    dropBtn.append(iconVector);

    setChildren(section, container);
    setChildren(container, [topWrapper, listAccount]);
    setChildren(topWrapper, [contentLeft, btnCreate]);
    setChildren(contentLeft, [title, dropdown]);
    setChildren(dropdown, [dropBtn, dropWrapper]);
    setChildren(dropWrapper, [dropNumber, dropBalance, dropTransactions]);

    dropBtn.addEventListener('click', () => {
        dropWrapper.classList.toggle('show');
        iconVector.classList.toggle('open');
    });

    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-btn')) {
            const dropdowns =
                document.getElementsByClassName('dropdown-wrapper');
            for (let i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                    iconVector.classList.remove('open');
                }
            }
        }
    };

    const dropdownButton = [dropNumber, dropBalance, dropTransactions];

    dropdownButton.forEach((item) => {
        item.addEventListener('click', (event) => {
            if (event.target.querySelector('.choice-mark')) {
                document.querySelector('.choice-mark').remove();

                sortItemList();

                return;
            }

            if (document.querySelector('.choice-mark')) {
                document.querySelector('.choice-mark').remove();
            }

            const choiceMark = el('span.choice-mark');

            choiceMark.innerHTML = mark;

            item.append(choiceMark);

            sortItemList(`${event.target.classList[0]}`);
        });
    });

    function sortItemList(str = '') {
        let sortData = [];

        Object.assign(sortData, data);

        if (str === 'transaction')
            sortData = sortData.sort((a, b) =>
                new Date(a.transactions[0].date) >
                new Date(b.transactions[0].date)
                    ? -1
                    : 1
            );

        if (str !== '' || str !== 'transcation')
            sortData = sortData.sort((a, b) => (a[str] > b[str] ? -1 : 1));

        listAccount.innerHTML = '';

        for (const el in sortData) {
            listAccount.append(fn(sortData[el]));
        }
    }

    btnCreate.addEventListener('click', async () => {
        listAccount.append(
            createAccountItem(
                await createAccount(
                    JSON.parse(sessionStorage.getItem('token')).token
                )
            )
        );
    });

    for (const el in data) {
        listAccount.append(fn(data[el]));
    }

    return section;
}

export function createAccountItem(item) {
    function renderDate(date) {
        if (date[0]) {
            const monts = [
                'января',
                'февраля',
                'марта',
                'апреля',
                'мая',
                'июня',
                'июля',
                'августа',
                'сентября',
                'октября',
                'ноября',
                'декабря',
            ];
            const handlerDate = new Date(date[0].date);
            const endTime = handlerDate.getTime();
            const resultTime = new Date(endTime);
            let dd = resultTime.getDate();
            if (dd < 10) dd = '0' + dd;

            let mm = resultTime.getMonth();

            let yy = resultTime.getFullYear();
            if (yy < 10) yy = '0' + yy;

            return dd + ' ' + monts[mm] + ' ' + yy;
        } else return 'Нет транзакций';
    }

    const accountItem = el('li.item.account-item'),
        itemWrap = el('div.item-wrapper'),
        accountNum = el(
            'span.account-number',
            `${item.account}`
        ),
        accountBalance = el(
            'span.account-balance',
            `${renderСurrency(item.balance)} ₽`
        ),
        accountTransaction = el(
            'span.account-transaction',
            `Последняя транзакция:`
        ),
        accountTransactionDate = el('span', `${renderDate(item.transactions)}`),
        accountBtn = el('button.btn', 'Открыть');

    accountBtn.addEventListener('click', async () => {
        navigation(`/account/${item.account}`);
    });

    setChildren(accountItem, [itemWrap, accountBtn]);
    setChildren(itemWrap, [
        accountNum,
        accountBalance,
        accountTransaction,
        accountTransactionDate,
    ]);

    return accountItem;
}
