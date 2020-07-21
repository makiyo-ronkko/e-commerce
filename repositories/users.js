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
        } catch (err) {// if no file, create an array
            fs.writeFileSync(this.filename, '[]');
        }
    }

    async getAll() {
        // Open the file called this.filename
        // Parse the contents // save as JSON data
        // Return the parsed data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }
}

const test = async () => {
    const repo = new UsersRepositories('users.json');
    const users = await repo.getAll();
    console.log(users);
}

test();