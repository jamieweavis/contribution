import https from 'https';

function parseBody(body) {
  const matches = [];
  const regex = /data-count="(.*?)"/g;
  let found;
  // eslint-disable-next-line no-cond-assign
  while ((found = regex.exec(body))) matches.push(found);

  const streak = {
    best: 0,
  };
  const contributions = {
    best: 0,
    total: 0,
  };
  matches.forEach(match => {
    const count = parseInt(match[1], 10);

    contributions.total += count;
    contributions.current = count;
    if (count > contributions.best) contributions.best = count;

    streak.current = count > 0 ? (streak.current += 1) : 0;
    if (streak.current > streak.best) streak.best = streak.current;
  });
  return { streak, contributions };
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
