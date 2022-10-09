const curUser = JSON.parse(window.localStorage.getItem('curUser'));

if (curUser !== null) {
    window.location.href = 'index.html';
}

const form = document.querySelector('.sign');

const generateError = function (text) {
    const error = document.createElement('div');
    error.className = 'error';
    error.style.color = 'red';
    error.innerHTML = text;
    return error;
};

const removeErrors = function () {
    const errors = form.querySelectorAll('.error');
    for (let i = 0; i < errors.length; i += 1) {
        errors[i].remove();
    }
};

const checkFields = function () {
    const fields = form.querySelectorAll('.field');

    removeErrors();

    let tmp = true;
    for (let i = 0; i < fields.length; i += 1) {
        if (!fields[i].value) {
            console.log('Field is empty', fields[i]);
            const error = generateError('Cannot be empty');
            form[i].parentElement.insertBefore(error, fields[i]);
            tmp = false;
        }
    }
    return tmp;
};

const checkPsw = function () {
    removeErrors();
    let tmp = true;
    if (form.psw.value !== form.conf_psw.value) {
        console.log('passwords dont match');
        const error = generateError('Password doesnt match');
        form.conf_psw.parentElement.insertBefore(error, form.conf_psw);
        form.conf_psw.value = '';
        tmp = false;
    }
    return tmp;
};

async function signup(event) {
    if (checkFields() && checkPsw() && form.checkValidity()) {
        event.preventDefault();

        const newUser = {
            first_name: form.first_name.value,
            last_name: form.last_name.value,
            user_name: form.user_name.value,
            email: form.email.value,
            password: form.psw.value,
            status: form.status.value,
        };

        fetch('http://localhost:5000/user', {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(async (response) => {
            if (!response.ok) {
                throw response.status;
            }
            window.localStorage.setItem('curUser', JSON.stringify(newUser));
            window.location.href = 'index.html';
            return response.text();
        })
            .catch((err) => {
                if (err === 401) {
                    alert('User with such username already exists');
                    form.user_name.value = '';
                }
                if (err === 402) {
                    alert('Incorrect status(it could be only "Teacher" or "Student")');
                    form.status.value = '';
                }
            });
    }
}

document.querySelector('.registerbtn').addEventListener('click', signup);
