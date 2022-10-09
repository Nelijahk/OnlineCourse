const curuser = JSON.parse(window.localStorage.getItem('curUser'));

if (curuser == null) {
    window.location.href = 'index.html';
}

async function getUser() {
    fetch(`http://localhost:5000/user/${curuser.user_name}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then((response) => {
        return response.json();
    }).then((json) => {
        const getuser = json;
        const firstname = document.getElementById('first_name');
        firstname.appendChild(
            document.createTextNode(getuser.first_name),
        );
        const lastname = document.getElementById('last_name');
        lastname.appendChild(
            document.createTextNode(getuser.last_name),
        );
        const username = document.getElementById('user_name');
        username.appendChild(
            document.createTextNode(getuser.user_name),
        );
        const email = document.getElementById('email');
        email.appendChild(
            document.createTextNode(getuser.email),
        );
        const status = document.getElementById('status');
        status.appendChild(
            document.createTextNode(getuser.status),
        );
    }).catch((error) => {
        alert(error);
    });
}

getUser();

