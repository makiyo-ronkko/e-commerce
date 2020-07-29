const fs = require('fs');
const crypto = require('crypto');
// util libary to apply util.promisify
const util = require('util');
const Repository = require('./repository');

// scrypt returns to promise based function
const scrypt = util.promisify(crypto.scrypt);

// async function is not allowed in constructor
class UsersRepository extends Repository {
    async create(attributes) {
        // atttributes === {email: '', password: ''}
        attributes.id = this.randomId();

        // salt random series of numbers and characters
        const salt = crypto.randomBytes(8).toString('hex');
        // promise scrypt = util.promisify(crypto.scrypt)
        const buffer = await scrypt(attributes.password, salt, 64); // callback is deriveKey<Buffer> which is a raw array 

        //{email: 'asdas@email.com', password: 'asdasad'}
        const records = await this.getAll();// get a list

        //records.push(attributes);// add new user
        const record = {
            ...attributes,
            password: `${buffer.toString('hex')}.${salt}`
            //overwriting attributes with new password
        };
        records.push(record);

        await this.writeAll(records);

        // to get object which contains id
        //return attributes;
        return record;

        // hashed is hashed password
        //buffer.toString('hex');
        // hased password with salt stored in DB
    }

    async comparePasswords(saved, supplied) {
        // Saved => password saved in our database. 'hashed.salt'
        // Supplied => password given to us by a user to sign in

        /* const result = saved.split('.');
        const hashed = result[0];
        const salt = result[1]; */
        const [hashed, salt] = saved.split('.');
        const hashedSuppliedBuffer = await scrypt(supplied, salt, 64); // callback is deriveKey<Buffer>

        // hashedSuppliedBuffer is buffer
        return hashed === hashedSuppliedBuffer.toString('hex');
    }
}

module.exports = new UsersRepository('users.json');

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