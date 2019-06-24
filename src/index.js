"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var https_1 = __importDefault(require("https"));
function parseBody(body) {
    var matches = [];
    var regex = /data-count="(.*?)"/g;
    var found;
    // eslint-disable-next-line no-cond-assign
    while ((found = regex.exec(body)))
        matches.push(found);
    var streak = {
        best: 0,
        current: 0,
    };
    var contributions = {
        best: 0,
        total: 0,
        current: 0
    };
    matches.forEach(function (match) {
        var count = parseInt(match[1], 10);
        contributions.total += count;
        contributions.current = count;
        if (count > contributions.best)
            contributions.best = count;
        streak.current = count > 0 ? (streak.current += 1) : 0;
        if (streak.current > streak.best)
            streak.best = streak.current;
    });
    return { streak: streak, contributions: contributions };
}
var contribution = function (username, options) {
    if (username === void 0) { username = ''; }
    if (options === void 0) { options = {}; }
    var enableCors = !!options.enableCors;
    var url = "https://github.com/users/" + username + "/contributions";
    if (enableCors)
        url = "https://cors-anywhere.herokuapp.com/" + url;
    return new Promise(function (resolve, reject) {
        https_1.default.get(url, function (response) {
            var body = '';
            response.setEncoding('utf8');
            response.on('data', function (chunk) {
                body += chunk;
            });
            response.on('end', function () {
                if (response.statusCode === 404) {
                    if (options.onFailure)
                        return options.onFailure(response);
                    return reject(response);
                }
                var data = parseBody(body);
                if (options.onSuccess)
                    return options.onSuccess(data);
                return resolve(data);
            });
        });
    });
};
module.exports = contribution;
