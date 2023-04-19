const util = require('util');

// lib to hash & salt data
const crypto = require('crypto');

const Repository = require('./repository');

// scrypt callback handler calls hash data
const scrypt = util.promisify(crypto.scrypt);

// Using Repository Approach for data modeling
class UsersRepository extends Repository {
  // attrs - an object, this method will override same method in parent class
  async create(attrs) {
    attrs.id = this.randomId();

    // generating salt with random letters & numbers
    const salt = crypto.randomBytes(8).toString('hex');

    // hashing & salting password into buffer data
    // note - 'buffer' is an array with raw data in node js
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();

    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`,
    };

    // save the user cred with hash password in db
    records.push(record);

    // update users data file with new user record
    await this.writeAll(records);

    return record;
  }

  async comparePasswords(saved, supplied) {
    // Saved -> password saved in our database. 'hashed.salt'
    // Supplied -> password given to us by a user trying sign in
    const [hashed, salt] = saved.split('.');
    const hashedSupplied = await scrypt(supplied, salt, 64);

    return hashed === hashedSupplied.toString('hex');
  }
}

module.exports = new UsersRepository('users.json');
