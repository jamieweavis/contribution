import type { IncomingMessage } from 'node:http';
import { get } from 'node:https';

import {
  GitHubStats,
  parseContributions,
  parseGitHubStats,
} from './transformers';

interface Options {
  onSuccess?: (stats: GitHubStats) => unknown;
  onFailure?: (error: IncomingMessage) => unknown;
}

const fetchStats = (
  username: string,
  options?: Options,
): Promise<GitHubStats> =>
  new Promise((resolve, reject) => {
    get(`https://github.com/users/${username}/contributions`, (response) => {
      let body = '';
      response.setEncoding('utf8');
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        if (response.statusCode === 404) {
          if (options?.onFailure) return options.onFailure(response);
          return reject(response);
        }

        const contributions = parseContributions(body);
        const gitHubStats = parseGitHubStats(contributions);

        if (options?.onSuccess) return options.onSuccess(gitHubStats);
        return resolve(gitHubStats);
      });
    });
  });

export { GitHubStats, fetchStats };
