describe('login to the app', () => {

    it('display login form', () => {
        cy.task('db:init');
        cy.task('db:seed');
        cy.visit(`${Cypress.env('localhost')}/login`);

        cy.intercept('GET', '/api/users/current-user/').as('checkUser');
        cy.wait('@checkUser').its('response.statusCode').should('eq', 401)

        cy.get('[data-testid=username-item]').find('label').should('have.text', 'Имя пользователя');
        cy.get('[data-testid=password-item]').find('label').should('have.text', 'Пароль');

        cy.get('[data-testid=username-item]').get('input[type=text]').should('exist');
        cy.get('[data-testid=password-item]').get('input[type=password]').should('exist');

        cy.get('[data-testid=submit]').should('have.text', 'Отправить');
    });

    it('check validations fails', () => {
        // cy.get('[data-testid=submit]').should('have.text', 'Отправить').click()
        cy.get('[data-testid=username-item]').find('input[type=text]').type('1').clear();
        cy.get('[data-testid=username-item]').find('.ant-form-item-explain-error')
            .should('have.text', 'Введите имя пользователя');
        
        cy.get('[data-testid=password-item]').find('input[type=password]').type('1').clear();
        cy.get('[data-testid=password-item]').find('.ant-form-item-explain-error')
            .should('have.text', 'Введите пароль');
        
        cy.get('[data-testid=username-item]').find('input[type=text]').type('invaliduser');
        cy.get('[data-testid=password-item]').find('input[type=password]').type('invalidpass');

        cy.get('[data-testid=username-item]').find('.ant-form-item-explain-error')
            .should('not.exist');

        cy.get('[data-testid=password-item]').find('.ant-form-item-explain-error')
            .should('not.exist');
        
        cy.intercept('POST', '/api/users/login/').as('loginFails');
        cy.get('[data-testid=submit]').click();

        cy.get('[data-testid=serverRrror-item').find('span.ant-typography-danger').should('not.be.empty');

        cy.wait('@loginFails').its('response.statusCode').should('eq', 400);

        cy.get('[data-testid=username-item]').find('input[type=text]').clear();
        cy.get('[data-testid=password-item]').find('input[type=password]').clear();
    });

    it('login user', () => {
        cy.get('[data-testid=username-item]').find('input[type=text]').type('test');
        cy.get('[data-testid=password-item]').find('input[type=password]').type('test');

        cy.intercept('POST', '/api/users/login/').as('loginSuccess');
        cy.get('[data-testid=submit]').click();

        cy.wait('@loginSuccess').its('response.statusCode').should('eq', 200);

        cy.url().should('eq', `${Cypress.env('localhost')}/themes`);

    })
});
