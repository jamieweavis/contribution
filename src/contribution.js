'use strict';

const https = require('https');

module.exports = (username, callback) => {
  callback = callback || function() {};

  return new Promise(resolve => {
    let body = '';

    const parseBody = () => {
      const matches = [];
      const regex = /data-count="(.*?)"/g;
      let match;
      while ((match = regex.exec(body))) matches.push(match);

      let contributions = 0;
      let streak = 0;
      matches.forEach(match => {
        const count = parseInt(match[1]);
        contributions += count;
        count > 0 ? streak++ : (streak = 0);
      });
      const data = { contributions, streak };

      resolve(data);
      return callback(data);
    };

    https.get(
      `https://github.com/users/${username}/contributions`,
      response => {
        response.setEncoding('utf8');
        response.on('data', chunk => {
          body += chunk;
        });
        response.on('end', parseBody);
      }
    );
  });
};
