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

        return attributes;// to get object which contains id
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
    async getOne(id) {
        const records = await this.getAll();
        return records.find(record => record.id === id);
    }
    async delete(id) {
        const records = await this.getAll();
        const filteredRecords = records.filter(record => record.id !== id);// return true
        await this.writeAll(filteredRecords);
    }
    async update(id, attributes) {
        const records = await this.getAll();
        const record = records.find(record => record.id === id);
        if (!record) {
            throw new Error(`Record with id ${id} not found`);
        }
        // record ==={email: 'test@test.com'}
        // attributes === {password: 'mypassword'}
        // record === {email: 'test@test.com, password: 'mypassword'}
        // assign attributes to record
        Object.assign(record, attributes);
        await this.writeAll(records);
    }
    async getOneBy(filters) {
        const records = await this.getAll();
        for (let record of records) {
            let found = true;
            for (let key in filters) {// in loop
                if (record[key] !== filters[key]) {
                    found = false;
                }
            }
            if (found === true) {
                return record;
            }
        }
    }
}

module.exports = new UsersRepositories('users.json');

//ANOTHER FILE
// const repo= require('./users');
// repo.getAll();
// repo.getOne();


/* module.exports = UsersRepositories;

//ANOTHER FILE
const UsersRepositories = require('./users');
const repo = new UsersRepositories('users.json');

// YET ANOTHER FILE....
const UsersRepositories = require('./users');
const repo = new UsersRepositories('user.json'); //typo */



/* const test = async () => {
    const repo = new UsersRepositories('users.json');

    //await repo.delete('5d60341c');
    //const user = await repo.getOne('5de6b3c4');
    //await repo.create({ email: 'test@test.com', password: 'password' })

    // const users = await repo.getAll();

    //console.log(user);
    //await repo.update('2cb2bfa1', { password: 'mypassword' });
    const user = await repo.getOneBy({ email: 'test@test.com', password: 'password', id: '5de6b3c4' });
    console.log(user);
}

test(); */