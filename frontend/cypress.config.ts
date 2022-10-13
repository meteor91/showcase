import { defineConfig } from "cypress";
import { exec } from "child_process";

const python = '../backend/venv/bin/python';

const execCLI = (action: string) => {
    return new Promise((resolve, reject) => {
        try {
            exec(action, (error, stdout, stderr) => {
                if (error) {
                    reject(stderr);    
                } else {
                    resolve(stdout);
                }

            });
        } catch (e) {
            reject(e);
        }
    })
}

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        setupNodeEvents(on, config) {
        // implement node event listeners here
            on('task', {
                'db:init': () => execCLI(`${python} ../manage.py migrate`),
                'db:seed': () => execCLI(`${python} ../manage.py createtestuser test`),
                'db:clear': () => execCLI('rm ../cypress.sqlite3'),
                                
            });
        },
    },
    env: {
        python,
    }
});
