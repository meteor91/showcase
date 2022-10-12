import { defineConfig } from "cypress";
import { exec } from "child_process";

const python = '../backend/venv/bin/python';
const localhost = 'http://localhost:3000';

const promise = (action: Function) => new Promise((resolve, reject) => {
    try {
        resolve(action());
    } catch (e) {
        reject(e);
    }
})

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
        // implement node event listeners here
            on('task', {
                //TODO: разобраться с stdout
                'db:init': () => promise(() => exec(`${python} ../manage.py migrate`)),
                'db:seed': () => promise(() => exec(`${python} ../manage.py loaddata backend/apps/users/fixtures/users.json`)),
            });
        },
    },
    env: {
        python,
        localhost,
    }
});
