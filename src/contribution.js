const https = require('https');

function contribution(username, cors) {
  const enableCors = cors || false;

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
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => {
        body += chunk;
      });
      response.on('end', () => {
        if (response.statusCode === 404) {
          reject(response);
        }
        const data = parseBody(body);
        resolve(data);
      });
    });
  });
};

function contributionCallback(username, callback, cors) {
  const enableCors = cors || false;

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
    let body = '';
    response.setEncoding('utf8');
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      if (response.statusCode === 404) {
        return callback(response);
      }
      const data = parseBody(body);
      callback(data);
    });
  });
}

module.exports = {
  contribution,
  contributionCallback
};