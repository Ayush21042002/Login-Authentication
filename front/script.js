var addButton = document.getElementById("add");

addButton.onclick = async function addNewUser(event) {
    event.preventDefault();
    let username  = document.getElementById('username').value
    let password = document.getElementById('password').value

    const resp = await fetch('/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    if(resp.status == 200){
        document.getElementById('username').value = ""
        document.getElementById('password').value = ""
    }
}

var addButton = document.getElementById("submit");

addButton.onclick = async function addCheckUser(event) {
    event.preventDefault();
    let username = document.getElementById('username').value
    let password = document.getElementById('password').value

    const resp = await fetch('/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })

    const token = await resp.json()

    console.log(token.success)
}

