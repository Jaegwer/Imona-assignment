const userApiBaseUrl = "https://reqres.in/api/users";
let currentPage = 1;
let userData = [];

const userListElement = document.getElementById("userList");
const prevPageButton = document.getElementById("prevPageButton");
const nextPageButton = document.getElementById("nextPageButton");
const paginationElement = document.getElementById("pagination");

function getUserList(page) {
  const url = `${userApiBaseUrl}?page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      userData = data.data;
      totalPages = data.total_pages;
      displayData();
      updatePageButtons();
      updatePagination();
    })
    .catch((error) => console.error(error));
}

function displayData() {
  userListElement.innerHTML = "";

  userData.forEach((user) => {
    const column = createCard(user);
    userListElement.appendChild(column);
  });
}

function createCard(user) {
  const column = document.createElement("div");
  column.className = "col-lg-4 mt-5";

  const card = document.createElement("div");
  card.className = "card p-0";

  const cardImg = document.createElement("div");
  cardImg.className = "card-image";

  const userImage = document.createElement("img");
  userImage.className = "img img-responsive";
  userImage.src = user.avatar;
  userImage.alt = "User Avatar";

  const cardContent = document.createElement("div");
  cardContent.className = "card-content d-flex flex-column align-items-center";

  const cardTitle = document.createElement("h4");
  cardTitle.className = "pt-2";
  cardTitle.textContent = `${user.first_name} ${user.last_name}`;

  cardTitle.addEventListener("click", () => {
    fetchUserDetails(user.id);
  });

  cardImg.appendChild(userImage);
  card.appendChild(cardImg);
  card.appendChild(cardContent);
  cardContent.appendChild(cardTitle);
  column.appendChild(card);

  return column;
}

function loadNextPage() {
  if (currentPage < totalPages) {
    currentPage++;
    getUserList(currentPage);
    updateURL();
  }
}

function loadPrevPage() {
  if (currentPage > 1) {
    currentPage--;
    getUserList(currentPage);
    updateURL();
  }
}

function updateURL() {
  window.history.pushState({}, document.title, `?page=${currentPage}`);
}

function updatePageButtons() {
  prevPageButton.disabled = currentPage === 1;
  nextPageButton.disabled = currentPage === totalPages;
}

function updatePagination() {
  paginationElement.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const listItem = document.createElement("li");
    listItem.className = `page-item ${i === currentPage ? "active" : ""}`;

    const link = document.createElement("a");
    link.className = "page-link";
    link.href = `?page=${i}`;
    link.textContent = i;

    listItem.appendChild(link);
    paginationElement.appendChild(listItem);
  }
}

function fetchUserDetails(userId) {
  const userDetailsUrl = `${userApiBaseUrl}/${userId}`;

  fetch(userDetailsUrl)
    .then((response) => response.json())
    .then((userData) => {
      window.location.href = `user-details.html?id=${userId}`;
    })
    .catch((error) => console.error(error));
}

const urlParams = new URLSearchParams(window.location.search);
const initialPage = parseInt(urlParams.get("page")) || 1;
currentPage = initialPage;

getUserList(currentPage);

if (nextPageButton && prevPageButton) {
  nextPageButton.addEventListener("click", loadNextPage);
  prevPageButton.addEventListener("click", loadPrevPage);
}
