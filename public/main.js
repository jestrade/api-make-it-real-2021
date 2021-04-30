const init = () => {
  const name = localStorage.getItem("name");
  if (name) {
    document.getElementById("welcome").innerHTML = `Bienvenid@, ${name}`;
    loadTweets();
    document.getElementById("private").style.display = "block";
  } else {
    document.getElementById("public").style.display = "block";
  }
};

const loadTweets = () => {
  const url = "/api/tweets";
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const tweets = json?.data;
      let html = ``;
      tweets.forEach((tweet) => {
        html += `<li>
                  <p><a href="users.html?id=${tweet.user?._id}">${tweet.user?.name}</a> says:</p>
                  <p>${tweet.content}</p>
                  <p><a href="users.html?id=${tweet._id}">comments: ${tweet.comments.length}</a> likes: ${tweet.likes}</p>
                  <p>${tweet.createdAt}</p>
                </li>`;
      });
      document.getElementById("tweets").innerHTML = `<ul>${html}</ul>`;
    });
};

const createUser = () => {
  const url = "/api/users";
  const user = {
    name: document.getElementById("signup_name").value,
    username: document.getElementById("signup_username").value,
    email: document.getElementById("signup_email").value,
    password: document.getElementById("signup_password").value,
    passwordConfirmation: document.getElementById("signup_passwordConfirmation")
      .value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById("signup_name").value = "";
      document.getElementById("signup_username").value = "";
      document.getElementById("signup_email").value = "";
      document.getElementById("signup_password").value = "";
      document.getElementById("signup_passwordConfirmation").value = "";
    });
};

const login = () => {
  const url = "/api/users/login";
  const user = {
    username: document.getElementById("login_username").value,
    password: document.getElementById("login_password").value,
  };

  const options = {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      if (json.message === "ok") {
        localStorage.setItem("username", json.data.username);
        localStorage.setItem("name", json.data.name);
        document.getElementById("message").innerHTML = "user authenticated!";
        document.getElementById("login_username").value = "";
        loadTweets();
        document.getElementById("public").style.display = "none";
        document.getElementById("private").style.display = "block";
      } else {
        document.getElementById("message").innerHTML = json.message;
      }

      document.getElementById("login_password").value = "";
    });
};

const logout = () => {
  const url = "/api/users/logout";
  fetch(url);
  localStorage.clear();
  document.getElementById("message").innerHTML = "";
  document.getElementById("public").style.display = "block";
  document.getElementById("private").style.display = "none";
};
