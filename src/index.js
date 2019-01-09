import https from 'https';

function parseBody(body) {
  const matches = [];
  const regex = /data-count="(.*?)"/g;
  let found;
  // eslint-disable-next-line no-cond-assign
  while ((found = regex.exec(body))) matches.push(found);

  let contributions = 0;
  let currentStreak = 0;
  let bestStreak = 0;
  let bestDay = 0;
  matches.forEach(match => {
    const count = parseInt(match[1], 10);
    contributions += count;
    currentStreak = count > 0 ? (currentStreak += 1) : 0;
    if (currentStreak > bestStreak) bestStreak = currentStreak;
    if (count > bestDay) bestDay = count;
  });
  return { contributions, currentStreak, bestStreak, bestDay };
}

const contribution = (username = '', options = {}) => {
  const enableCors = !!options.enableCors;
  let url = `https://github.com/users/${username}/contributions`;
  if (enableCors) url = `https://cors-anywhere.herokuapp.com/${url}`;

  return new Promise((resolve, reject) => {
    https.get(url, response => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', chunk => {
        body += chunk;
      });
      response.on('end', () => {
        if (response.statusCode === 404) {
          if (options.onFailure) return options.onFailure(response);
          return reject(response);
        }
        const data = parseBody(body);
        if (options.onSuccess) return options.onSuccess(data);
        return resolve(data);
      });
    });
  });
};

export default contribution;
