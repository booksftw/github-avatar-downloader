var request = require('request');
var fs      = require('fs');
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
    cb(err, resObj);
  });

}

function downloadImageByURL(avatarUrl, filePath) {
  // ...
  var options = {
    url: avatarUrl,
    headers: {
      'User-Agent': 'request',
      'Authorization':secret.GITHUB_TOKEN
    }
  };

  request.get(avatarUrl)
    .on('error', function(error){
      throw error;
    })
    .pipe(fs.createWriteStream(filePath));
}

// downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log(result);

  for (variable in result) {
    // statement
    // console.log(result[variable].avatar_url);
    let el = result[variable];
    let avatarUrl = el.avatar_url;
    let filePath = `avatars/${el.login}.jpg`;
    downloadImageByURL(avatarUrl, filePath);
  }

  // for (el of result) {
  //   console.log(el, 'EL');
  //   // statement
  //   let avatarUrl = el.avatar_url;
  //   let filePath = `avatars/${el.login}.jpg`;
  //   downloadImageByURL(avatarUrl, filePath);
  // }


});
