export async function authorization(login, password) {
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    if (response.error === 'No such user')
        throw new Error('Такого пользователя не существует');

    sessionStorage.setItem('token', JSON.stringify(response.payload));

    return response.payload;
}

export async function getAccounts(token) {
    const response = await fetch('http://localhost:3000/accounts', {
        method: 'GET',
        headers: { Authorization: `Basic ${token}` },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return response.payload;
}

export async function createAccount(token) {
    const response = await fetch('http://localhost:3000/create-account', {
        method: 'POST',
        headers: { Authorization: `Basic ${token}` },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    return response.payload;
}

export async function getAccountsId(token, id) {
    const response = await fetch(`http://localhost:3000/account/${id}`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return response.payload;
}

export async function getCurrency(token) {
    const response = await fetch(`http://localhost:3000/currencies`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return response.payload;
}

export function openSocket() {
    const socket = new WebSocket('ws://localhost:3000/currency-feed');

    return socket;
}

export async function getBanks(token) {
    const responce = await fetch(`http://localhost:3000/banks`, {
        method: 'GET',
        headers: {
            Authorization: `Basic ${token}`,
        },
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });

    return responce.payload;
}

export async function currencyBuy(token, from, to, amount) {
    const response = await fetch('http://localhost:3000/currency-buy', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to,
            amount,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    console.log(response);
    return response;
}

export async function transfer(token, from, to, amount) {
    const response = await fetch('http://localhost:3000/transfer-funds', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            from,
            to,
            amount,
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            return data;
        });
    return response;
}
