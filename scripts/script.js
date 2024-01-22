const user_list_base_url = "https://reqres.in/api/users";
let currentPage = 1;
let userData = [];

function get_user_list(page) {
  const url = `${user_list_base_url}?page=${page}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      userData = data.data;
      displayData();
      updatePageButtons();
      updatePagination();
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayData() {
  const userListElement = document.getElementById("userList");
  userListElement.innerHTML = "";

  userData.forEach((user) => {
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
    cardContent.className =
      "card-content d-flex flex-column align-items-center";

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

    userListElement.appendChild(column);
  });
}

function loadNextPage() {
	currentPage++;
	get_user_list(currentPage);
	updateURL();
  }

  function loadPrevPage() {
	if (currentPage > 1) {
	  currentPage--;
	  get_user_list(currentPage);
	  updateURL();
	}
  }

  function updateURL() {
	window.history.pushState({}, document.title, `?page=${currentPage}`);
  }

  function updatePageButtons() {
	const prevPageButton = document.getElementById('prevPageButton');
	const nextPageButton = document.getElementById('nextPageButton');

	prevPageButton.disabled = currentPage === 1;
	nextPageButton.disabled = currentPage === 2;
  }

  function updatePagination() {
	const paginationElement = document.getElementById('pagination');
	paginationElement.innerHTML = '';

	for (let i = 1; i <= 2; i++) {
	  const listItem = document.createElement('li');
	  listItem.className = `page-item ${i === currentPage ? 'active' : ''}`;

	  const link = document.createElement('a');
	  link.className = 'page-link';
	  link.href = `?page=${i}`;
	  link.textContent = i;

	  listItem.appendChild(link);
	  paginationElement.appendChild(listItem);
	}
  }
  function fetchUserDetails(userId) {
	const userDetailsUrl = `${user_list_base_url}/${userId}`;

	fetch(userDetailsUrl)
	  .then((response) => response.json())
	  .then((userData) => {

		window.location.href = `user-details.html?id=${userId}`;
	  })
	  .catch((error) => {
		console.error(error);
	  });
  }

  const urlParams = new URLSearchParams(window.location.search);
  const initialPage = parseInt(urlParams.get('page')) || 1;
  currentPage = initialPage;


  get_user_list(currentPage);


  if (nextPageButton && prevPageButton) {
      nextPageButton.addEventListener('click', loadNextPage);
      prevPageButton.addEventListener('click', loadPrevPage);
    }
