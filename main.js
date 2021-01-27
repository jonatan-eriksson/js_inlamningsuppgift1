/*
TODO:
*! skapa blogginlägg
* redigera blogginlägg
*/

"use strict";

window.onload = () => {
  const input = document.querySelector("#input-number");

  input.addEventListener("change", (e) => {
    clearPosts();
    let posts = createMultiplePosts(e.currentTarget.value);
    appendPosts(posts);
  });
};

function createPost(num) {
  const post = document.createElement("article");
  const title = document.createElement("h2");
  const para = document.createElement("p");

  post.className = "post";
  title.innerHTML = "Article " + num;
  para.innerHTML = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta fugit natus ex eos nesciunt accusantium doloremque architecto. Cumque atque fuga deserunt aspernatur porro culpa consequuntur. Minima aliquam placeat perferendis ad.";

  post.append(title);
  post.append(para);

  return post;
}

function createMultiplePosts(num) {
  let posts = [];
  for (let i = 1; i <= num; i++) {
    posts.push(createPost(i));
  }
  return posts;
}

function appendPost(post) {
  const blogPosts = document.querySelector(".blog-posts");
  blogPosts.append(post);
}

function appendPosts(posts) {
  const blogPosts = document.querySelector(".blog-posts");
  posts.forEach((post) => blogPosts.append(post));
}

function clearPosts() {
  const blogPosts = document.querySelector(".blog-posts");
  blogPosts.innerHTML = "";
}
