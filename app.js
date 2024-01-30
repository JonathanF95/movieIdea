const input = document.getElementById('input');
const button = document.getElementById('button');

button.addEventListener('click', (e) => {
    e.preventDefault();
    input.value = '';
})