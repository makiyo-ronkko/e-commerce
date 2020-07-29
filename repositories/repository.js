const fs = require('fs');
const crypto = require('crypto');

// Object Oriented Programming method
module.exports = class REpository {
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

    async create(attributes) {
        attributes.id = this.randomId();

        const records = await this.getAll();
        records.push(attributes);
        await this.writeAll(records);

        return attributes;
    }

    async getAll() {
        // Open the file called this.filename
        // Parse the contents and save as JSON data
        // Return the parsed data
        return JSON.parse(await fs.promises.readFile(this.filename, { encoding: 'utf8' }));
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