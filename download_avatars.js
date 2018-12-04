var request = require('request');
var secret  = require('secret');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'authorization':
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });

}

curl -i -H 'Authorization: token 89d61a0643a27c044a59fd1de81a23f166fc5b80' https://api.github.com/repos/jquery/jquery/contributors