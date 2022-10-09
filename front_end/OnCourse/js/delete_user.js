const user = JSON.parse(window.localStorage.getItem('curUser'));

async function deleteUser(event) {
    event.preventDefault();
    fetch(`http://localhost:5000/user/${user.user_name}`, {
        method: 'DELETE',
    })
        .then((response) => {
            if (!response.ok) {
                throw response.status;
            }
            window.localStorage.clear();
            window.location.href = 'login.html';
        })
        .catch((error) => {
            alert(error);
        });
}

document.querySelector('.del_btn').addEventListener('click', deleteUser);
