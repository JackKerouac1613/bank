describe('template spec', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/');
    });

    it('Авторизация', () => {
        cy.get('.input-login').type('developer');
        cy.get('.input-password').type('developer');
        cy.get('.entrance-btn').click();
    });

    it('Проверка счета и возможность перевода средств', () => {
        cy.get('.input-login').type('developer');
        cy.get('.input-password').type('developer');
        cy.get('.entrance-btn').click();
        cy.get('.account-item:first-child .btn').click();
        cy.get('.input-recipient').type('764441734505865');
        cy.get('.input-amount').type('1221');
        cy.get('.btn_submit').click();
        cy.get('.notification.notice').should('have.class', 'success');
    });

    it('Проверка создания нового счета и перевода средств', () => {
        cy.get('.input-login').type('developer');
        cy.get('.input-password').type('developer');
        cy.get('.entrance-btn').click();
        cy.get('.btn_create').click();
        cy.wait(100);
        cy.get('.account-item:last-child .btn').click()
        cy.get('.btn_return').click();
        cy.get('.account-item:first-child .btn').click();
        cy.get('.input-recipient').type('764441734505865');
        cy.get('.input-amount').type('1221');
        cy.get('.btn_submit').click();
    });
});
