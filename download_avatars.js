var request = require('request');
var secret  = require('./secrets');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization':secret.GITHUB_TOKEN
    }
  };


  request(options, function(err, res, body) {
    let resObj = JSON.parse(body);
    //let stringfyObj = JSON.stringify(resObj, null, 2)
    cb(err, resObj);
  });

}


getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result[0].avatar_url);

});
// curl -i -H 'Authorization: token 89d61a0643a27c044a59fd1de81a23f166fc5b80' https://api.github.com/repos/jquery/jquery/contributors