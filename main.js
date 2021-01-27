/*
TODO:
*! skapa blogginlägg
*! redigera blogginlägg
*/

"use strict";

window.onload = () => {
  const input = document.querySelector("#input-number");

  input.addEventListener("change", (e) => {
    clearPosts();
    let posts = createMultiplePosts(e.currentTarget.value);
    appendPosts(posts);
  });

  const editBtn = document.querySelector(".post-edit");
  editBtn.addEventListener("click", editPost);
};

// Skapar ett blogginlägg med titel och brödtext och returnerar artikeln
function createPost(num) {
  const post = document.createElement("article");
  const title = document.createElement("h2");
  const text = document.createElement("p");
  const editBtn = document.createElement("button");
  const undoBtn = document.createElement("button");

  post.className = "post";

  title.className = "post-title";
  title.textContent = "Article " + num;

  text.className = "post-text";
  text.textContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta fugit natus ex eos nesciunt accusantium doloremque architecto. Cumque atque fuga deserunt aspernatur porro culpa consequuntur. Minima aliquam placeat perferendis ad.";

  editBtn.className = "post-btn post-edit";
  editBtn.type = "button";
  editBtn.textContent = "Edit";
  editBtn.onclick = editPost;

  undoBtn.className = "post-btn post-undo hide";
  undoBtn.type = "button";
  undoBtn.textContent = "Undo";

  post.append(title);
  post.append(text);
  post.append(editBtn);
  post.append(undoBtn);

  return post;
}

// Skapar flera blogginlägg och lägger dem i en array
function createMultiplePosts(num) {
  let posts = [];
  for (let i = 1; i <= num; i++) {
    posts.push(createPost(i));
  }
  return posts;
}

// Lägger till bloginlägg i elementet med klassen blog-posts
function appendPosts(posts) {
  const blogPosts = document.querySelector(".blog-posts");

  if (Array.isArray(posts)) {
    posts.forEach((post) => blogPosts.append(post));
  } else {
    blogPosts.append(posts);
  }
}

function clearPosts() {
  const blogPosts = document.querySelector(".blog-posts");
  blogPosts.innerHTML = "";
}

function editPost(e) {
  const editBtn = e.currentTarget;
  const post = e.currentTarget.parentNode;

  const title = post.querySelector(".post-title");
  const text = post.querySelector(".post-text");
  const undoBtn = post.querySelector(".post-undo");

  undoBtn.classList.toggle("hide");

  if (title.isContentEditable) {
    editBtn.textContent = "Edit";
    title.contentEditable = false;
    text.contentEditable = false;

    undoBtn.onclick = "";
  } else {
    editBtn.textContent = "Save";
    title.contentEditable = true;
    text.contentEditable = true;

    // Spara original titel och text
    let oldTitle = title.innerHTML;
    let oldText = text.innerHTML;

    undoBtn.onclick = undoBtn.onclick = () => {
      // Återställ om man klickar på Undo
      title.innerHTML = oldTitle;
      text.innerHTML = oldText;
    };
  }
}
