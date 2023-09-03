import { el, setChildren } from 'redom';
import { transfer } from '../api.js';
import { arrow, mail } from '../svg.js';
import { createNotification } from '../notification/notification.js';
import { renderСurrency, animationNotification } from '../other.js';
import './check.css';

export function checkAccountId(data, fn) {
    const section = el('section'),
        container = el('div.container'),
        errorWrapper = el('div.error-wrapper'),
        topWrapper = el('div.check-top-wrapper'),
        contentTop = el('div.check-content-top'),
        contentBottom = el('div.check-content-bottom'),
        title = el('h1.title.title_main', 'Просмотр счёта'),
        btnBack = el('a.btn.check-btn.btn_return', 'Вернуться назад'),
        iconBtn = el('span.icon-arrow'),
        accountNumber = el('span.check-number', `№ ${data.account}`),
        balanceWrapper = el('div.balance-wrapper'),
        balanceTitle = el('h4.title.title_low.check-balance-title', 'Баланс'),
        balanceNum = el(
            'span.check-balance',
            `${renderСurrency(data.balance)} ₽`
        ),
        middleWrapper = el('div.check-middle-wrapper'),
        transferWrapper = el('div.check-transfer-wrapper'),
        transferTitle = el(
            'h4.title.title_low.check-transfer-title',
            'Новый перевод'
        ),
        transferContent = el('div.transfer-content'),
        labelRecipient = el('label.recipient-label'),
        titleRecipient = el('span.check-placeholder', 'Номер счёта получателя'),
        inpRecipient = el('input.inp.input-recipient', { placeholder: 'Введите номер' }),
        labelAmount = el('label.amount-label'),
        titleAmount = el('span.check-placeholder', 'Сумма перевода'),
        inpAmount = el('input.inp.input-amount', { placeholder: 'Введите сумму' }),
        iconSubmit = el('span.icon-mail'),
        btnSubmit = el('a.btn.check-btn.btn_submit', 'Отправить'),
        dynamicsWrapper = el('div.check-dynamics-wrapper'),
        dynamicsTitle = el('h4.title.check-dynamics-title'),
        chartWrapper = el('div.chart-wrapper'),
        chartCanvas = el('canvas#myChart'),
        bottomWrapper = el('div.check-bottom-wrapper'),
        historyTitle = el(
            'h4.title.title_low.history-title',
            'История переводов'
        );

    iconBtn.innerHTML = arrow;
    btnBack.append(iconBtn);
    iconSubmit.innerHTML = mail;
    btnSubmit.append(iconSubmit);

    btnBack.addEventListener('click', () => {
        history.back();
    });

    btnSubmit.addEventListener('click', async () => {
        try {
            if (inpAmount.value == '' || inpRecipient == '') {
                throw new Error('Заполните все поля');
            }

            const res = await transfer(
                JSON.parse(sessionStorage.getItem('token')).token,
                data.account,
                inpRecipient.value,
                inpAmount.value
            );

            if (res.error != '') {
                throw new Error(`${res.error}`);
            }

            const item = createNotification(
                'Транзакция прошла успешно',
                'success'
            );

            inpRecipient.value = '';
            inpAmount.value = '';

            animationNotification(errorWrapper, item);
        } catch (error) {
            const item = createNotification(error.message);

            animationNotification(errorWrapper, item);
        }
    });

    function createTable(transactions) {
        const historyTable = el('table.history-table'),
            thead = el('thead.thead'),
            tbody = el('tbody'),
            headTr = el('tr'),
            senderTh = el(
                'th.table-th.table_col-first.first_th',
                'Счёт отправителя'
            ),
            recipientTh = el('th.table-th', 'Счёт получателя'),
            sumTh = el('th.table-th.sum_th', 'Сумма'),
            dateTh = el('th.table-th.last_th', 'Дата');

        setChildren(thead, headTr);
        setChildren(headTr, [senderTh, recipientTh, sumTh, dateTh]);

        if (transactions.length !== 0) {
            const lastTransaction = transactions.slice(-10).reverse();

            lastTransaction.forEach((item) => {
                tbody.append(fn(item, data.account));
            });
        }

        setChildren(historyTable, [thead, tbody]);

        return historyTable;
    }

    setChildren(section, [container, errorWrapper]);
    setChildren(container, [topWrapper, middleWrapper, bottomWrapper]);
    setChildren(topWrapper, [contentTop, contentBottom]);
    setChildren(contentTop, [title, btnBack]);
    setChildren(contentBottom, [accountNumber, balanceWrapper]);
    setChildren(balanceWrapper, [balanceTitle, balanceNum]);
    setChildren(middleWrapper, [transferWrapper, dynamicsWrapper]);
    setChildren(transferWrapper, [transferTitle, transferContent]);
    setChildren(transferContent, [labelRecipient, labelAmount, btnSubmit]);
    setChildren(labelRecipient, [titleRecipient, inpRecipient]);
    setChildren(labelAmount, [titleAmount, inpAmount]);
    setChildren(dynamicsWrapper, [dynamicsTitle, chartWrapper]);
    setChildren(chartWrapper, chartCanvas);
    setChildren(bottomWrapper, [historyTitle, createTable(data.transactions)]);

    return section;
}

export function createTd(element, account) {
    const tr = el('tr.table-tr'),
        fromTd = el('td.table-td.table_col-first', `${element.from}`),
        toTd = el('td.table-td', `${element.to}`),
        dateTd = el('td.table-td', `${renderTime(element.date)}`);

    function renderTime(date) {
        const handlerDate = new Date(date),
            endTime = handlerDate.getTime(),
            resultTime = new Date(endTime);

        let dd = resultTime.getDate();
        if (dd < 10) dd = '0' + dd;

        let mm = resultTime.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;

        let yy = resultTime.getFullYear();
        if (yy < 10) yy = '0' + yy;

        return dd + '.' + mm + '.' + yy;
    }

    if (element.from == account) {
        const amountTd = el(
            'td.table-td',
            `- ${renderСurrency(element.amount)} ₽`
        );

        amountTd.classList.add('red');

        setChildren(tr, [fromTd, toTd, amountTd, dateTd]);
    } else {
        const amountTd = el(
            'td.table-td',
            `+ ${renderСurrency(element.amount)} ₽`
        );

        amountTd.classList.add('green');

        setChildren(tr, [fromTd, toTd, amountTd, dateTd]);
    }

    return tr;
}
