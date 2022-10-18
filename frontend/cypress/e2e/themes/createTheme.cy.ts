describe('themes', () => {

    before(() => {
        cy.login('test', 'test');
    });

    beforeEach(() => {
        cy.saveCookies();
        cy.visit(`${Cypress.config('baseUrl')}/themes/create`);
        cy.fetchCurrentUser();
        cy.url().should('eq', `${Cypress.config('baseUrl')}/themes/create`);
    });

    it('check form display', () => {
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

    it('check empty form submit validation', () => {
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

    it('check form client validation', () => {
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

    // it('check server validation', () => {
    //
    // })
});
