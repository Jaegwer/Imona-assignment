const form_url = "https://reqres.in/api/users";

function submitForm(event) {

	event.preventDefault();


    const nameInputValue = document.getElementById('nameInput').value;
    const jobInputValue = document.getElementById('jobInput').value;
    fetch(form_url, {
        method: "POST",
        body: JSON.stringify({
            name: nameInputValue,
            job: jobInputValue
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then(response => response.json())
    .then(json => {
        Toastify({
            duration: 5000,
            text: `User created: ID ${json.id}, Name: ${json.name}, Job: ${json.job}, CreatedAt: ${json.createdAt}`,
            className: "success",
            stopOnFocus: true,
            close: true,
            style: {
                background: "green",
            },
        }).showToast();
    })
    .catch(error => {
        Toastify({
            duration: 5000,
            text: "Error creating user. Please try again.",
            className: "danger",
            stopOnFocus: true,
            close: true,
            style: {
                background: "red",
            },
        }).showToast();
    });
}
