const form = [...document.querySelector('.form').children];

form.forEach((item, index) => {
    setTimeout(() => {
        item.style.opacity = '1';
    }, index * 100);
})

window.onload = () => {
    if(sessionStorage.getItem('firstname')){
        location.href = '/';
    }
}

const firstname = document.querySelector('.firstname') || null;
const lastname = document.querySelector('.lastname') || null;
const username = document.querySelector('.username') || null;
const email = document.querySelector('.email');
const password = document.querySelector('.password');
const submitBtn = document.querySelector('.submit-btn');
const alertBox = document.querySelector('.alert-box');
const alertP = document.querySelector('.alert');

if (firstname === null && lastname === null || username == null) { // login page is open

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('/login-user', {
            method: 'POST',
            headers: new Headers({'Content-Type': 'application/json'}),
            body: JSON.stringify({
                email: email.value,
                password: password.value,
            })
        })
            .then(res => {
                if(!res.ok) {
                    return res.json().then(errorData => {
                        throw new Error(errorData.message || 'Something went wrong.');
                    });
                }
                return res.json();
            })
            .then(data => {
                sessionStorage.setItem('firstname', data.user.firstname);

                alertBox.style.top = '10%';
                alertP.textContent = data.message;
                setTimeout(() => {
                    window.location.href = '/'; // Redirect to the login page
                }, 2000);
            })
            .catch(err => {
                alertBox.style.top = '10%';
                alertP.textContent = err.message;
                setTimeout(() => {
                    alertBox.style.top = '-100%';
                    alertP.textContent = ''; // Redirect to the login page
                }, 2000);
            })
    })


} else {  // register page is open

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();

        fetch('/register-users', {
            method: 'POST',
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify({
                firstname: firstname.value,
                lastname: lastname.value,
                username: username.value,
                email: email.value,
                password: password.value
            })

        })
            .then(res => {
            if(!res.ok) {
                return res.json().then(errorData => {
                    throw new Error(errorData.message || 'Something went wrong.');
                });
            }
            return res.json();
        })
            .then(data => {
                alertBox.style.top = '10%';
                alertP.textContent = data.message;
                setTimeout(() => {
                    window.location.href = '/login'; // Redirect to the login page
                }, 2000);
            })
            .catch(err => {
                alertBox.style.top = '10%';
                alertP.textContent = err.message;
                setTimeout(() => {
                    alertBox.style.top = '-100%';
                    alertP.textContent = ''; // Redirect to the login page
                }, 2000);
            })
    })
}
