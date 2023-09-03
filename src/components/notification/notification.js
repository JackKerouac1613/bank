import { warning, success } from '../svg';
import { el, setChildren } from 'redom';
import './notification.css';

export function createNotification(str, flag = 'error') {
    const notificationItem = el('div.notificaton-item'),
        notification = el('span.notification.notice', `${str}`),
        icon = el('notification-icon');

    if (flag != 'error') {
        icon.innerHTML = success;
        notification.classList.add('success');
    } else {
        icon.innerHTML = warning;
        notification.classList.add('error');
    }

    setChildren(notificationItem, [notification, icon]);

    return notificationItem;
}
