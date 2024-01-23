const formUrl = "https://reqres.in/api/users";

document.addEventListener("DOMContentLoaded", function () {
  function validate(event) {
    const nameInput = document.getElementById("nameInput");
    const jobInput = document.getElementById("jobInput");

    if (nameInput.value.trim() === "") {
      nameInput.classList.add("error");
    }

    if (jobInput.value.trim() === "") {
      jobInput.classList.add("error");
    }
    if (nameInput.value.trim() === "" || jobInput.value.trim() === "") {
      event.preventDefault();
      setTimeout(function () {
        nameInput.classList.remove("error");
        jobInput.classList.remove("error");
      }, 500);
    } else {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({ name: nameInput.value, job: jobInput.value }),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      };

      fetch(formUrl, requestOptions)
        .then((response) => response.json())
        .then(handleSuccess)
        .catch(handleError);
      event.preventDefault();
    }
  }

  const registerForm = document.getElementById("registerForm");

  registerForm.addEventListener("submit", validate);
});

function handleSuccess(json) {
  const { id, name, job, createdAt } = json;
  showToast(
    `User created: ID ${id}, Name: ${name}, Job: ${job}, CreatedAt: ${createdAt}`,
    "success",
    "green"
  );
}

function handleError(error) {
  showToast("Error creating user. Please try again.", "danger", "red");
}

function showToast(text, className, background) {
  Toastify({
    duration: 5000,
    text,
    className,
    stopOnFocus: true,
    close: true,
    style: { background },
  }).showToast();
}
