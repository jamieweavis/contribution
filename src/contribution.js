const https = require('https');

module.exports = (username, callback) => {
  const cb = callback || function cb() {};

  return new Promise(resolve => {
    function parseBody(body) {
      const matches = [];
      const regex = /data-count="(.*?)"/g;
      let found;
      // eslint-disable-next-line no-cond-assign
      while ((found = regex.exec(body))) matches.push(found);

      let contributions = 0;
      let streak = 0;
      matches.forEach(match => {
        const count = parseInt(match[1], 10);
        contributions += count;
        streak = count > 0 ? (streak += 1) : 0;
      });
      return { contributions, streak };
    }

    https.get(
      `https://github.com/users/${username}/contributions`,
      response => {
        let body = '';
        response.setEncoding('utf8');
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', () => {
          const data = parseBody(body);
          resolve(data);
          return cb(data);
        });
      }
    );
  });
};
