const db = require('./libs/db')
console.error('err.message');
db.run(`DELETE FROM presentations`, [], function(err) {
  if (err) {
    return console.log(err.message);
  }
  return console.log('success');
});
