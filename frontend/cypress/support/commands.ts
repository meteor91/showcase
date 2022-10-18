/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

Cypress.Commands.add('login', (username: string, password: string) => {
    cy.visit('/login');
    cy.get('[data-testid=username-item]').find('input[type=text]').type(username);
    cy.get('[data-testid=password-item]').find('input[type=password]').type(password);

    cy.intercept('POST', '/api/users/login/').as('loginSuccess');
    cy.get('[data-testid=submit]').click();

    cy.wait('@loginSuccess').its('response.statusCode').should('eq', 200);
    cy.url().should('eq', `${Cypress.config('baseUrl')}/themes`);
});

Cypress.Commands.add('saveCookies', () => {
    Cypress.Cookies.preserveOnce('sessionid', 'remember_token')
    Cypress.Cookies.preserveOnce('auth_token', 'remember_token')
    Cypress.Cookies.preserveOnce('csrftoken', 'remember_token')
});

Cypress.Commands.add('fetchCurrentUser', () => {
    cy.intercept('GET', '/api/users/current-user/').as('currentUser');
    cy.wait('@currentUser').its('response.statusCode').should('eq', 200);
});

Cypress.Commands.add(
    'findAntdFormItem',
    {prevSubject: 'element'},
    (subject: JQuery, formItemTestId: string, elementWithin: string) => {
        return subject
            .find(`[data-testid=${formItemTestId}]`)
            .find(elementWithin)
    }
);

Cypress.Commands.add('getAntdFormItem', (formItemTestId: string, elementWithin: string) => {
    return cy.get(`[data-testid=${formItemTestId}]`)
            .find(elementWithin)
});

// support/commands.js
// Set CYPRESS_COMMAND_DELAY above zero for demoing to stakeholders,
// E.g. CYPRESS_COMMAND_DELAY=1000 node_modules/.bin/cypress open
const COMMAND_DELAY = Cypress.env('COMMAND_DELAY') || 0;
if (COMMAND_DELAY > 0) {
    for (const command of ['visit', 'click', 'trigger', 'type', 'clear', 'reload', 'contains']) {
        Cypress.Commands.overwrite(command, (originalFn, ...args) => {
            const origVal = originalFn(...args);

            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(origVal);
                }, COMMAND_DELAY);
            });
        });
    }
}