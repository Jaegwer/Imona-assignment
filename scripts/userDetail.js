document.addEventListener('DOMContentLoaded', async function () {
	function getQueryParam(name) {
	  const urlParams = new URLSearchParams(window.location.search);
	  return urlParams.get(name);
	}

	async function fetchUserDetails() {
	  const userId = getQueryParam('id');

	  if (!userId) {
		showErrorToast("User ID is missing in the query parameter.");
		return;
	  }

	  const userDetailsUrl = `https://reqres.in/api/users/${userId}`;

	  try {
		const response = await fetch(userDetailsUrl);
		const userData = await response.json();
		displayUserDetails(userData);
	  } catch (error) {
		showErrorToast("Error fetching user details.");
	  }
	}

	function showErrorToast(message) {
	  Toastify({
		duration: 3000,
		text: message,
		className: "danger",
		stopOnFocus: true,
		close: true,
		style: { background: "red" },
	  }).showToast();
	}

	function displayUserDetails(userData) {
	  const userDetailsElement = document.getElementById('userDetails');

	  userDetailsElement.innerHTML = '';

	  const centerContainer = document.createElement('div');
	  centerContainer.className = 'd-flex justify-content-center';

	  const card = document.createElement('div');
	  card.className = 'card mb-3 mt-5 detail-card';

	  const row = document.createElement('div');
	  row.className = 'row g-0';

	  const colImage = document.createElement('div');
	  colImage.className = 'col-md-4';

	  const colDetails = document.createElement('div');
	  colDetails.className = 'col-md-8';

	  const userImage = document.createElement('img');
	  userImage.src = userData.data.avatar;
	  userImage.className = 'img-fluid rounded-start';
	  userImage.alt = 'User Avatar';

	  const cardBody = document.createElement('div');
	  cardBody.className = 'card-body';

	  const cardTitle = document.createElement('h5');
	  cardTitle.className = 'card-title';
	  cardTitle.textContent = `${userData.data.first_name} ${userData.data.last_name}`;

	  const cardText = document.createElement('p');
	  cardText.className = 'card-text';
	  cardText.textContent = `Email: ${userData.data.email}`;

	  colImage.appendChild(userImage);
	  colDetails.appendChild(cardBody);
	  cardBody.appendChild(cardTitle);
	  cardBody.appendChild(cardText);
	  row.appendChild(colImage);
	  row.appendChild(colDetails);
	  card.appendChild(row);
	  centerContainer.appendChild(card);
	  userDetailsElement.appendChild(centerContainer);
	}

	await fetchUserDetails();
  });
