let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// get repos function

function getRepos() {
  if (theInput.value == "") {
    reposData.innerHTML = `<span> please write github username </span>`;
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((response) => response.json())
      .then((repositories) => {
        //empty the container
        reposData.innerHTML="";
        //loop on repositories
        repositories.forEach(repo => {
            //create maindiv
            let mainDiv = document.createElement("div")
            //create repoName
            let repoName = document.createTextNode(repo.name)
            //append text to main div
            mainDiv.appendChild(repoName);
            //create repo url
            let url = document.createElement("a")
            //create repo url text
            let urlText =document.createTextNode("visit")
            //append the urltext to repo url
            url.appendChild(urlText);
            //add url to repo url
            url.href = `https://github.com/${theInput.value}/${repo.name}`;
            //set attribute to blank
            url.setAttribute("target","_blank");
            //append url to maindiv
            mainDiv.appendChild(url)
            //create stars count spans
            let starsSpan = document.createElement("span")
            //create the stars count text
            let starsText = document.createTextNode(
              `stars: ${repo.stargazers_count}`
            );
            //add star text to stars span
            starsSpan.appendChild(starsText);
            //add stars count span to maindiv
            mainDiv.appendChild(starsSpan);
            //add class to maindiv
            mainDiv.className ="repo-box";

            //append the main div to container
            reposData.appendChild(mainDiv);
        });
      })
  }
}
