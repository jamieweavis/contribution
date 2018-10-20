const https = require('https');

module.exports = (username, options) => {
  const opts = options || {};
  const callback = opts.callback || function cb() {};
  const enableCors = !!opts.enableCors || false;

  return new Promise((resolve, reject) => {
    function parseBody(body) {
      const matches = [];
      const regex = /data-count="(.*?)"/g;
      let found;
      // eslint-disable-next-line no-cond-assign
      while ((found = regex.exec(body))) matches.push(found);

      let contributions = 0;
      let currentStreak = 0;
      let bestStreak = 0;
      matches.forEach(match => {
        const count = parseInt(match[1], 10);
        contributions += count;
        currentStreak = count > 0 ? (currentStreak += 1) : 0;
        if (currentStreak > bestStreak) bestStreak = currentStreak;
      });
      return { contributions, currentStreak, bestStreak };
    }

    let url = `https://github.com/users/${username}/contributions`;
    if (enableCors) url = `https://cors-anywhere.herokuapp.com/${url}`;

    https.get(url, response => {
      if (response.statusCode !== 200) {
        return reject({
          statusCode: response.statusCode,
          message: response.statusMessage
        });
      }
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => {
        body += chunk;
      });
      response.on('end', () => {
        const data = parseBody(body);
        resolve(data);
        return callback(data);
      });
    });
  });
};
