const util = require('util');

const crypto = require('crypto');

const Repository = require('./repository');

// util.promisify - default 'util' lib returns a version with promises
// scrypt callback handler is to hash data
const scrypt = util.promisify(crypto.scrypt);

// Using Repository Approach for data modeling
class UsersRepository extends Repository {
  // attrs - an object, this method will override same method in parent class
  async create(attrs) {
    attrs.id = this.randomId();

    // Using randomBytes to generate random strings for salting
    const salt = crypto.randomBytes(8).toString('hex');

    // hashing & salting password into buffer data
    // note - 'buffer' is an array with raw data in node js, hashed data here
    const buffer = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();

    const record = {
      ...attrs,
      password: `${buffer.toString('hex')}.${salt}`,
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

// note - exporting instance of a class rather than the class to avoid importing issues
// It also avoids of creating instance of a class again on other modules.
module.exports = new UsersRepository('users.json');
