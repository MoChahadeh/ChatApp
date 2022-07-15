function handleForm(event) { event.preventDefault(); } 
document.addEventListener('submit', handleForm);

const MODE_DEV = false

const rootUrl = MODE_DEV ? 'http://localhost:3011' : '"https://chatappmc.herokuapp.com"';