class GitHub {
  constructor() {
    this.username = "";
  }
  async getUserDetails(username) {
    try {
      const userDataFromApi = await fetch(
        `https://api.github.com/users/${username}`
      );
      if (!userDataFromApi.ok) {
        throw new Error(
          `Sorry we couldn't find any user with ${this.username}`
        );
      }
      const userData = await userDataFromApi.json();
      if (!userData) {
        alert(`Sorry, no such user found!`);
      }
      this.createUserCard(userData);
    } catch (e) {
      throw new Error(`Sorry! We are facing issue due to ${e}`);
    }
  }
  createUserCard(userData) {
    const userDetails = document.getElementById(`user-container`);
    const userCard = `
    <section id="user-details" class="d-flex justify-content-around align-items-center">
      <div class="user-avatar">
          <img class="img-thumbnail" id="user-avatar-image" src="${userData.avatar_url}"/>
      </div>
      <section class="about-user">
              <h1>${userData.name}</h1>
              <div class="user-bio">${userData.bio}</div> 
              <div class="row">          
                <div class="col-6 col-md-4 user-followers"><b>Followers:</b> ${userData.followers}</div>
                <div class="col-6 col-md-4 user-following"><b>Following:</b> ${userData.following}</div>
                <div class="col-6 col-md-4 user-repo-count"><b>Repos:</b> ${userData.public_repos}</div>
              </div>
             <div class="row">
                    <div class="col-6 user-twitter-id"><b>Twitter:</b> ${userData.twitter_username}</div>
                    <div class="col-6 user-location"><b>Location:</b> ${userData.location}</div>
              </div>  
      </section>
      </section>
            `;
    userDetails.innerHTML = userCard;
    return userDetails;
  }
}

window.addEventListener("load", () => {
  const gitHub = new GitHub();
  const userName = document.getElementById(`username`);
  userName.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      const userName = event.target.value;
      gitHub.getUserDetails(userName);
    }
  });
});
