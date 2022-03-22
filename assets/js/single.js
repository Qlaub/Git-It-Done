const issueContainerEl = document.getElementById('issues-container');
const limitWarningEl = document.getElementById('limit-warning');
const repoNameEl = document.querySelector('#repo-name');

const getRepoName = function() {
  // repo name
  const queryString = document.location.search;
  const repoName = queryString.split('=')[1];
  if (repoName) {
    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
  } else {
    //if no repo, go back to homepage
    document.location.replace('./index.html')
  }
}

const getRepoIssues = function(repo) {
  apiUrl = `https://api.github.com/repos/${repo}/issues`
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        displayIssues(data);

        if (response.headers.get('Link')) {
          displayWarning(repo);
          console.log("repo has more than 30 issues");
        }
    })
  } else {
    //if unsuccessful, go to homepage
    document.location.replace('./index.html')
  }
  }).catch(function(error) {
    alert('Error: Unable to connect to GitHub');
    console.log(error);
  })
}

const displayIssues = function(issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues"
    return;
  }

  for (let i=0; i < issues.length; i++) {
    let issueEl = document.createElement('a');
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute('href', issues[i].html_url);
    issueEl.setAttribute("target", "_blank");

    let titleEl = document.createElement('span');
    titleEl.textContent = issues[i].title;

    issueEl.appendChild(titleEl);

    let typeEl = document.createElement('span');

    if (issues[i].pull_request) {
      typeEl.textContent = '(Pull request)';
    } else {
      typeEl.textContent = '(Issue)';
    }

    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  }
}

const displayWarning = function(repo) {
  limitWarningEl.textContent = 'To see more than 30 issues, visit '

  const linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", `https://github.com/${repo}/issues`);
  linkEl.setAttribute("target", "_blank");

  limitWarningEl.appendChild(linkEl);
}

getRepoName();