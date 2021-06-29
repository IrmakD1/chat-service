const fs = require('fs');
const path = require('path');

const json = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
);

module.exports = started => async (req, res, next) => {
  try {
    if (req.path === '/') {
      const uptime = (Date.now() - started.getTime()) / 1000;

      const { version, name } = json;

      return res.send({ name, started, uptime, version });
    }
  } catch (err) {
    /* eslint-disable no-empty */
  }

  return next();
};
