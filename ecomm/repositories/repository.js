// base class - OOP approach to share its properties & methods to other classes

const fs = require('fs');

// lib to hash & salt data
const crypto = require('crypto');

// A single class responsible for all kinds of data access known as Repository Approach
module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repository requires a filename');
    }

    this.filename = filename;

    // Creating user file only one time on object instance
    // check to see file exists, Sync since async operation can't be done inside constructor
    try {
      fs.accessSync(this.filename);
    } catch (err) {
      // create one if no file with array of objects exist instead of logging error
      fs.writeFileSync(this.filename, '[]');
    }
  }

  // create a record data with attrs = {}
  async create(attrs) {
    // set id
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);

    // update the list
    await this.writeAll(records);

    // return the current object
    return attrs;
  }

  // open & read file
  async getAll() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: 'utf8',
      })
    );
  }

  async writeAll(records) {
    await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
  }

  randomId() {
    // note - instead of using Math.random() for numbers
    // Using node default module crypto's method to generate random string of characters
    // 4 - <Buffer 0c 5d d9 41> is 4 bytes of data returning as random string of letters & numbers with 'hex' format
    return crypto.randomBytes(4).toString('hex'); // 'e0bed9fd'
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find((record) => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find((record) => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    // add updated record with rest of the data like with spread operator
    Object.assign(record, attrs);

    // update data with above updated records
    await this.writeAll(records);
  }

  // filter one object with object properties like email, id etc in filters object - { id: '1', email: 'test@test.com' }
  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        // filtering an object in records based on current input filter object arg's properties
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      // on all values match which is still true, return match object
      if (found) {
        return record;
      }
    }
  }
};
