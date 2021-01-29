/*
TODO:
*! skapa blogginlägg
*! redigera blogginlägg
*/

"use strict";

window.addEventListener("DOMContentLoaded", (e) => {
  const blog = document.querySelector(".blog-posts");
  const input = document.querySelector("#input-number");

  /* När inputrutan förändras så körs koden, 
     först töms blog-posts elementet,
     sen skapas ett antal blogginlägg, lika många som värdet i inputrutan,
     till sist läggs blogginläggen till i DOMen 
  */
  input.addEventListener("change", (e) => {
    clearPosts(blog);
    let posts = createMultiplePosts(e.currentTarget.value);
    appendPosts(blog, posts);
  });

  const editBtn = document.querySelector(".post-edit");
  editBtn.addEventListener("click", editPost);
});

// Skapar ett blogginlägg med titel och brödtext och returnerar blogginlägget
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

// Lägger till blogginlägg i blog-post elementet
function appendPosts(elem, posts) {
  if (Array.isArray(posts)) {
    posts.forEach((post) => elem.append(post));
  } else {
    elem.append(posts);
  }
}

// Tar bort allt innuti elementet, för att rensa blogginlägg
function clearPosts(elem) {
  elem.innerHTML = "";
}

function editPost(e) {
  const editBtn = e.currentTarget;
  const post = editBtn.parentNode;

  const title = post.querySelector(".post-title");
  const text = post.querySelector(".post-text");
  const undoBtn = post.querySelector(".post-undo");

  undoBtn.classList.toggle("hide");

  if (title.isContentEditable) {
    // Avaktivera redigering på text och titel
    editBtn.textContent = "Edit";
    title.contentEditable = false;
    text.contentEditable = false;

    undoBtn.onclick = "";
  } else {
    // Aktivera redigering på text och titel
    editBtn.textContent = "Save";
    title.contentEditable = true;
    text.contentEditable = true;

    // Undo
    // Spara original text och titel
    let oldTitle = title.innerHTML;
    let oldText = text.innerHTML;

    undoBtn.onclick = undoBtn.onclick = () => {
      // Återställ text och titel om man klickar på Undo
      title.innerHTML = oldTitle;
      text.innerHTML = oldText;
    };
  }
}
