module.exports = {
  // array of error object, prop is an element name like email
  getError(errors, prop) {
    try {
      // errors.mapped returns an object: { email: {value: 'test', msg: 'error msg' }, password: {}}
      return errors.mapped()[prop].msg;
    } catch (err) {
      return '';
    }
  },
};
