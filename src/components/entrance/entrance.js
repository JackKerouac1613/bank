import { el, setChildren } from 'redom';
import { authorization } from '../api';
import { navigation } from '../../script';
import { createNotification } from '../notification/notification';
import { animationNotification } from '../other';

import './entrance.css';

export function createEntrance() {
    const section = el('section'),
        modal = el('div.modal'),
        window = el('div.entrance-window'),
        errorWrapper = el('div.error-wrapper'),
        title = el('h1.title.title_main.entrance-title', 'Вход в аккаунт'),
        form = el('form.entrance-form'),
        labelLogin = el('label.entrance-label.label_login'),
        labelPassword = el('label.entrance-label'),
        loginSpan = el('span.entrance-placeholder', 'Логин'),
        passwordSpan = el('span.entrance-placeholder', 'Пароль'),
        inputLogin = el('input.inp.entrance-input.input-login', { placeholder: 'Введите логин' }),
        inputPassword = el('input.inp.entrance-input.input-password', {
            placeholder: 'Введите пароль',
            type: 'password',
        }),
        btn = el('button.btn.entrance-btn', 'Войти');

    btn.addEventListener('click', async (event) => {
        event.preventDefault();
        sessionStorage.clear();

        try {
            validate(inputLogin.value, inputPassword.value);

            await authorization(inputLogin.value, inputPassword.value);

            navigation('/accounts');
        } catch (error) {
            const errorItem = createNotification(error.message);

            animationNotification(errorWrapper, errorItem);
        }
    });

    setChildren(section, modal);
    setChildren(modal, window);
    setChildren(window, [title, form, errorWrapper]);
    setChildren(form, [labelLogin, labelPassword, btn]);
    setChildren(labelLogin, [loginSpan, inputLogin]);
    setChildren(labelPassword, [passwordSpan, inputPassword]);

    return section;
}

function validate(login, password) {
    if (
        login.length < 6 ||
        password.length < 6 ||
        login.includes(' ') ||
        password.includes(' ')
    ) {
        throw new Error('Введите корретктные данные');
    } else return true;
}
