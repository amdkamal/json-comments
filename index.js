const axios = require("axios");
const BASE_URL = "https://jsonplaceholder.typicode.com";

async function getPosts() {
  try {
    //JSON placeholder only has 100 posts
    const response = await axios.get(`${BASE_URL}/posts`);
    const posts = response.data;
    return posts;
  } catch (error) {
    return { status: "error" };
  }
}

async function getComments() {
  try {
    const posts = await getPosts();
    const requestsArr = posts.map((post) =>
      axios.get(`${BASE_URL}/posts/${post.id}/comments`)
    );
    const comments = await Promise.all(requestsArr).then((values) =>
      values.map((value) => value.data)
    );
    var mergedComments = [].concat.apply([], comments);
    mergedComments.forEach((comment) => {
      comment.size = comment.body.length;
    });
    return { status: "ok" };
  } catch (error) {
    return { status: "error" };
  }
}

getComments();
