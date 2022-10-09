const curUser = JSON.parse(window.localStorage.getItem('curUser'));

if (curUser !== null) {
    window.location.href = 'index.html';
}

const form = document.querySelector('.sign');

async function login(event) {
    if (form.checkValidity()) {
        event.preventDefault();
    }
    const user = {
        user_name: form.user_name.value,
        password: form.password.value,
    };

    fetch('http://localhost:5000/user/login', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(async (response) => {
        if (!response.ok) {
            throw response.status;
        }
        window.localStorage.setItem('curUser', JSON.stringify(user));
        window.location.href = 'index.html';
        return response.text();
    })
        .catch((err) => {
            if (err === 401) {
                alert('Wrong user_name or password!');
                window.location.reload();
            }
        });
}

document.querySelector('.registerbtn').addEventListener('click', login);
