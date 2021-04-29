const loadTweets = () => {
  const url = '/api/tweets';
  fetch(url)
    .then((res) => res.json())
    .then((json) => {
      const tweets = json?.tweets;
      let html = ``;
      tweets.forEach((tweet) => {
        html += `<li>
                  <p><a href="users.html?id=${tweet.user?._id}">${tweet.user?.name}</a> says:</p>
                  <p>${tweet.content}</p>
                  <p><a href="users.html?id=${tweet._id}">comments: ${tweet.comments.length}</a> likes: ${tweet.likes}</p>
                  <p>${tweet.createdAt}</p>
                </li>`;
      });
      document.getElementById('tweets').innerHTML = `<ul>${html}</ul>`;
    });
};

const createUser = () => {
  const url = '/api/users';
  const user = {
    name: document.getElementById('name').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    passwordConfirmation: document.getElementById('passwordConfirmation').value,
  };

  const options = {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  fetch(url, options)
    .then((res) => res.json())
    .then((json) => {
      document.getElementById('name').value = '';
      document.getElementById('username').value = '';
      document.getElementById('email').value = '';
      document.getElementById('password').value = '';
      document.getElementById('passwordConfirmation').value = '';
    });
};
