import './components/normalize.css';
import './style.css';
import { createHeader } from './components/header/header.js';
import { el, setChildren } from 'redom';
import Navigo from 'navigo';
import Chart from 'chart.js/auto';
import { openSocket } from './components/api.js';

const router = new Navigo('/');

let socket = null;

export function navigation(url) {
    if (socket) socket.close();

    router.navigate(url);
}

const body = document.body,
    main = el('main'),
    header = (nav, str) => createHeader(nav, str);

router
    .on('/', async () => {
        const { createEntrance } = await import(
            './components/entrance/entrance.js'
        );

        setChildren(body, [header(), main]);
        setChildren(main, createEntrance());
    })
    .resolve();

router
    .on('/accounts', async () => {
        const { getAccounts } = await import('./components/api.js'),
            { createAccountList, createAccountItem } = await import(
                './components/account/account.js'
            );

        const res = await getAccounts(
            JSON.parse(sessionStorage.getItem('token')).token
        );

        setChildren(main, createAccountList(res, createAccountItem));

        setChildren(body, [header(true, 'account'), main]);
    })
    .resolve();

router
    .on('/account/:id', async ({ data: { id } }) => {
        const { getAccountsId } = await import('./components/api.js'),
            { checkAccountId, createTd } = await import(
                './components/check/check.js'
            ),
            { createChart } = await import('./components/createChart');

        const res = await getAccountsId(
            JSON.parse(sessionStorage.getItem('token')).token,
            id
        );

        setChildren(main, checkAccountId(res, createTd));

        setChildren(body, [header(true), main]);

        const ctx = document.getElementById('myChart').getContext('2d');

        new Chart(ctx, createChart(res));
    })
    .resolve();

router
    .on('/currency', async () => {
        const { getCurrency } = await import('./components/api.js'),
            { currencyExchange, appendCurrencyItem } = await import(
                './components/currency/currency.js'
            );

        const resepsion = await getCurrency(
            JSON.parse(sessionStorage.getItem('token')).token
        );

        setChildren(main, currencyExchange(resepsion));

        setChildren(body, [header(true, 'currency'), main]);

        socket = openSocket();

        socket.onmessage = function (event) {
            appendCurrencyItem(JSON.parse(event.data));
        };

        window.addEventListener('popstate', () => {
            socket.close();
        });
    })
    .resolve();

router
    .on('/map', async () => {
        const { getBanks } = await import('./components/api.js'),
            { createMapPage } = await import('./components/map/map.js');

        const responce = await getBanks(
            JSON.parse(sessionStorage.getItem('token')).token
        );

        setChildren(main, createMapPage(responce));

        setChildren(body, [header(true, 'map'), main]);
    })
    .resolve();
