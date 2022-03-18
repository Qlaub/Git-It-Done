const getUserRepos = function(user) {
  //format our github api url
  const apiUrl = `https://api.github.com/users/${user}/repos`

  //fetch request to url
  fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
      console.log(data)
    })
  })
}

getUserRepos('qlaub');