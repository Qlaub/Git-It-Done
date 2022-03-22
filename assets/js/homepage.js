const userFormEl = document.getElementById('user-form');
const nameInputEl = document.getElementById("username");
const repoContainerEl = document.getElementById("repos-container");
const repoSearchTerm = document.getElementById("repo-search-term");

const getUserRepos = function(user) {
  //format our github api url
  const apiUrl = `https://api.github.com/users/${user}/repos`

  //fetch request to url
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayRepos(data, user);
      })
    } else {
      alert("Error: GitHub user not found");
    }
  }).catch(function(error) {
    alert("Error: Unable to connect to GitHub")
  })
}

const formSubmitHandler = function(event) {
  event.preventDefault();

  const username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = '';
  } else {
    alert("Please enter a GitHub user name");
  }
}

const displayRepos = function(repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  for (index in repos) {
    repoName = repos[index].full_name;

    let repoEl = document.createElement('a');
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute('href', `./single-repo.html?repo=${repoName}`);

    let titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    const statusEl = document.createElement('span');
    statusEl.classList = "flex-row align-center";

    if (repos[index].open_issues_count > 0) {
      statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[index].open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    repoEl.appendChild(statusEl);

    repoEl.appendChild(titleEl);
    repoContainerEl.appendChild(repoEl);
  }
}

userFormEl.addEventListener('submit', formSubmitHandler)