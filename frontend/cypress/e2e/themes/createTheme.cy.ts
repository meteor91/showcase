describe('createTheme', () => {

    before(() => {
        cy.login('test', 'test');
    });

    beforeEach(() => {
        cy.saveCookies();
        cy.visit(`${Cypress.config('baseUrl')}/themes/create`);
        cy.fetchCurrentUser();
        cy.url().should('eq', `${Cypress.config('baseUrl')}/themes/create`);
    });

    it('form display', () => {
        // initial form
        cy.getAntdFormItem('themeLabel-item', 'label').should('have.text', 'Name');
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]').should('exist');
        cy.getAntdFormItem('addQuestion-item', 'button').should('exist');

        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').should('have.text', 'Submit');
        cy.getAntdFormItem('formSubmit-item', '[data-testid=cancel]').should('exist');

        // with question
        cy.getAntdFormItem('addQuestion-item', 'button').click();

        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionLabel-0-item', 'input')
            .should('have.attr', 'placeholder', 'Question');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionAnswer-0-item', 'input')
            .should('have.attr', 'placeholder', 'Answer');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionPrice-0-item', '.ant-select-selection-placeholder')
            .should('have.text', 'Price');

        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionDelete-0-item', 'svg[data-icon=minus-circle]')
            .should('exist');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionDelete-0-item', 'svg[data-icon=minus-circle]')
            .click();

        cy.get('[data-testid=questionItem-0]').should('not.exist');
    });

    it('client validation - empty form submit', () => {
        cy.getAntdFormItem('addQuestion-item', 'button').click();
        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').click();

        cy.getAntdFormItem('themeLabel-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionLabel-0-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionAnswer-0-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');
        cy.get('[data-testid=questionItem-0]')
            .findAntdFormItem('questionPrice-0-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');
    });

    it('client validation - fields', () => {
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('1').clear();
        cy.getAntdFormItem('themeLabel-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');

        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('test text');
        cy.getAntdFormItem('themeLabel-item', '.ant-form-item-explain-error')
            .should('not.exist');

        cy.getAntdFormItem('addQuestion-item', 'button').click();

        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionLabel-0-item', 'input')
            .type('1').clear();
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionLabel-0-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');

        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionAnswer-0-item', 'input')
            .type('1').clear();
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionAnswer-0-item', '.ant-form-item-explain-error')
            .should('have.text', 'This field required');
    });

    it('server validation - no questions', () => {
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('test name');

        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').click();

        cy.get('[data-testid=errorList]').should('be.visible');

        cy.get('[data-testid=errorList]').find('[data-testid=serverError-0]')
            .should('have.text', 'Questions: This field is required.');

        cy.get('[data-testid=closeErrorsDrawler]').click();
        cy.get('[data-testid=errorList]').should('not.be.visible');
    });

    it('server validation - unacceptable fields', () => {
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('fuck');

        cy.getAntdFormItem('addQuestion-item', 'button').click();

        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionLabel-0-item', 'input')
            .type('fuck');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionAnswer-0-item', 'input')
            .type('fuck');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionPrice-0-item', 'input')
            .click();
        cy.get('[data-testid=questionPrice-0-value-100]').click();

        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').click();

        cy.get('[data-testid=errorList]').should('be.visible');

        cy.get('[data-testid=errorList]').find('[data-testid=serverError-0]')
            .should('have.text', 'Theme name: Obscene language is forbidden');

        cy.get('[data-testid=errorList]').find('[data-testid=serverError-1]')
            .should('have.text', 'Question № 1: Obscene language is forbidden');

        cy.get('[data-testid=errorList]').find('[data-testid=serverError-2]')
            .should('have.text', 'Answer to question № 1: Obscene language is forbidden');

        cy.get('[data-testid=closeErrorsDrawler]').click();
        cy.get('[data-testid=errorList]').should('not.be.visible');
    });

    it('server validation - more question', () => {
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('test label');

        cy.getAntdFormItem('addQuestion-item', 'button').click();

        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionLabel-0-item', 'input')
            .type('test name');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionAnswer-0-item', 'input')
            .type('test answer');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionPrice-0-item', 'input')
            .click();
        cy.get('[data-testid=questionPrice-0-value-200]').click();

        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').click();

        cy.get('[data-testid=errorList]').should('be.visible');

        cy.get('[data-testid=errorList]').find('[data-testid=serverError-0]')
            .should('have.text', 'Questions: Add more questions');

        cy.get('[data-testid=closeErrorsDrawler]').click();
        cy.get('[data-testid=errorList]').should('not.be.visible');
    });

    it.only('create theme', () => {
        cy.getAntdFormItem('themeLabel-item', 'input[type=text]')
            .type('test name');

        cy.getAntdFormItem('addQuestion-item', 'button').click();
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionLabel-0-item', 'input')
            .type('test value 1');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionAnswer-0-item', 'input')
            .type('test answer 1');
        cy.get('[data-testid=questionItem-0]').findAntdFormItem('questionPrice-0-item', 'input')
            .click();
        cy.get('[data-testid=questionPrice-0-value-100]').click();

        cy.getAntdFormItem('addQuestion-item', 'button').click();
        cy.get('[data-testid=questionItem-1]').findAntdFormItem('questionLabel-1-item', 'input')
            .type('test value 2');
        cy.get('[data-testid=questionItem-1]').findAntdFormItem('questionAnswer-1-item', 'input')
            .type('test answer 2');
        cy.get('[data-testid=questionItem-1]').findAntdFormItem('questionPrice-1-item', 'input')
            .click();
        cy.get('[data-testid=questionPrice-1-value-200]').click();

        cy.getAntdFormItem('formSubmit-item', '[data-testid=submit]').click();
        cy.intercept('GET', '/api/themes/themes/?limit=5&offset=0').as('themesList');
        cy.url().should('eq', `${Cypress.config('baseUrl')}/themes`);
        cy.wait('@themesList').its('response.statusCode').should('eq', 200);

        cy.get('[data-testid=themesTable]').should('exist');

        cy.get('[data-testid=themesTable]').find('[data-row-key=1]')
            .find('td [data-testid=themeName]').should('have.text', 'test name')
        cy.get('[data-testid=themesTable]').find('[data-row-key=1]')
            .find('td [data-testid=authorName]').should('have.text', 'test')
    });

});
