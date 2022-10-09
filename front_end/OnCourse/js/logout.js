const curUser = JSON.parse(window.localStorage.getItem('curUser'));

if (curUser === null) {
    document.getElementById('logout_btn').style.display = 'none';
    document.getElementById('acc_btn').style.display = 'none';
} else {
    document.getElementById('log_btn').style.display = 'none';
    document.getElementById('sign_btn').style.display = 'none';
}

async function logout(event) {
    event.preventDefault();
    window.localStorage.clear();
    window.location.href = 'login.html';
}

document.querySelector('.logout_btn').addEventListener('click', logout);
