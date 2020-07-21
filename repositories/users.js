const fs = require('fs');

// async function is not allowed in constructor
class UsersRepositories {
    constructor(filename) {
        if (!filename) {
            throw new Error('Creating a repository requires a filename')
        }
        this.filename = filename;
        //fs.accessSync (no callback) check if a file exits
        try {
            fs.accessSync(this.filename);
        } catch (err) {
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async checkForFile() {

    }
}

const repo = new UsersRepositories('users.json');