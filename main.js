"use strict";

window.addEventListener("DOMContentLoaded", (e) => {
  const blog = document.querySelector(".blog-posts");
  const sidebarList = document.querySelector(".sidebar .nav-list");
  const input = document.querySelector("#input-number");

  // När input elementet förändras genom att användaren fyller i ett nummer så körs koden
  input.addEventListener("change", (e) => {
    clear(blog); // Rensar blogginläggen
    let posts = createMultiplePosts(e.currentTarget.value); // Skapar blogginlägg
    appendPosts(blog, posts); // Lägger till dem i DOMen

    clear(sidebarList); // Rensar sidebarlistan
    let items = createSidebarItems(posts); // Skapar nya länkar till blogginläggen
    appendPosts(sidebarList, items); // Lägger till dem i sidebaren
  });

  // Sidebarknappen
  const sidebarToggle = document.querySelector(".sidebar-toggle");
  sidebarToggle.onclick = toggleSidebar;
});

// Tar bort alla blogginlägg
function clear(element) {
  element.innerHTML = "";
}

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
  title.id = "article" + num;

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

    updateSidebarItem(title.id, title.innerHTML);
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

// Sidebar
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  sidebar.classList.toggle("collapse");
}

function updateSidebarItem(id, newText) {
  const sidebar = document.querySelector(".sidebar .nav-list");
  let title = sidebar.querySelector("[href='#" + id + "']");

  title.innerHTML = newText;
}

function createSidebarItem(id, text) {
  const item = document.createElement("li");
  const link = document.createElement("a");

  item.className = "nav-item";

  link.className = "nav-link";
  link.href = "#" + id;
  link.textContent = text;

  item.append(link);

  return item;
}

// Skapar en länk till varje blogginlägg
function createSidebarItems(posts) {
  let items = [];
  if (Array.isArray(posts)) {
    posts.forEach((post) => {
      let id = post.querySelector(".post-title").id;
      let title = post.querySelector(".post-title").textContent;
      items.push(createSidebarItem(id, title));
    });
  }
  return items;
}
