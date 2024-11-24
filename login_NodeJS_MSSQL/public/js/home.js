const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.getItem('firstname')) {
        location.href = '/login';
    } else {
        greeting.textContent = `Hello ${sessionStorage.getItem('firstname')}!`;
    }
}

const logOutBtn = document.querySelector('.logout');

logOutBtn.addEventListener('click', () => {
    sessionStorage.clear();
    location.reload();
})