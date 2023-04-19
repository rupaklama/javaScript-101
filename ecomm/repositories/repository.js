// base class - OOP approach to share its properties & methods to other classes

const fs = require('fs');

// lib to hash & salt data
const crypto = require('crypto');

// A single class responsible for all kinds of data access
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
      // create one if no file with array of objects
      fs.writeFileSync(this.filename, '[]');
    }
  }

  // create a record data
  async create(attrs) {
    attrs.id = this.randomId();

    const records = await this.getAll();
    records.push(attrs);

    await this.writeAll(records);

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
    // 4 - 4 bytes of data, random string of letters & numbers
    return crypto.randomBytes(4).toString('hex');
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);

    if (!record) {
      throw new Error(`Record with id ${id} not found`);
    }

    Object.assign(record, attrs);

    // update data with above updated records
    await this.writeAll(records);
  }

  // filter user object
  async getOneBy(filters) {
    const records = await this.getAll();

    for (let record of records) {
      let found = true;

      for (let key in filters) {
        // comparing keys
        if (record[key] !== filters[key]) {
          found = false;
        }
      }

      // on all values match which is still true
      if (found) {
        return record;
      }
    }
  }
};
