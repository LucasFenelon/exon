(async = () => {
  syncronizeDataBase();
})();

async function syncronizeDataBase() {
  const database = require('../../config/db');
  const modelUserTypes = require('../registerUserTypes');
  const modelUsers = require('../registerUsers');
  const modelPasswords = require('../registerPasswords');
  const modelLogins = require('../logLogins');
  await database.sync({ force: true });
  await database.close();
}
