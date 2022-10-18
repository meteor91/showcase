declare namespace Cypress {
    interface Chainable {
        login: (username: string, password: string) => void;
        saveCookies: () => void;
        fetchCurrentUser: () => void;
        getAntdFormItem: (formItemTestId: string, elementWithin: string) => Chainable<JQuery<HTMLElement>>;
        findAntdFormItem: (formItemTestId: string, elementWithin: string) => Chainable<JQuery<HTMLElement>>;
    }
}