const fs = require('fs');
const crypto = require('crypto');

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
        // Parse the contents and save as JSON data
        // Return the parsed data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
    }
    async create(attributes) {

        attributes.id = this.randomId();

        //{email: 'asdas@email.com', password: 'asdasad'}
        const records = await this.getAll();// get a list
        records.push(attributes);// add new user
        await this.writeAll(records);
    }
    //helper method
    async writeAll(records) {
        // write the updated 'record' array back to this.filename
        await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2)); // null =no customization for json format, 2 spaces
    }
    randomId() {
        //Crypto(Cryptocurrency)
        // return Buffer
        return crypto.randomBytes(4).toString('hex');
    }
}

const test = async () => {
    const repo = new UsersRepositories('users.json');

    await repo.create({ email: 'test@test.com', password: 'password' })

    const users = await repo.getAll();
    console.log(users);
}

test();