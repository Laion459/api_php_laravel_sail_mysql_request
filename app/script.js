// Função para criar um novo usuário
function createUser() {
    var name = document.getElementById('createName').value;
    var email = document.getElementById('createEmail').value;
    var password = document.getElementById('createPassword').value;

    fetch('http://127.0.0.1:8000/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, email: email, password: password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao criar o usuário.');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário criado com sucesso!');
        document.getElementById('createName').value = '';
        document.getElementById('createEmail').value = '';
        document.getElementById('createPassword').value = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}

// Função para atualizar um usuário existente
function updateUser() {
    var email = document.getElementById('updateEmail').value;
    var name = document.getElementById('updateName').value;

    fetch('http://127.0.0.1:8000/api/users/' + email, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao atualizar o usuário.');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário atualizado com sucesso!');
        document.getElementById('updateEmail').value = '';
        document.getElementById('updateName').value = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}

// Função para excluir um usuário
function deleteUser() {
    var email = document.getElementById('deleteEmail').value;

    fetch('http://127.0.0.1:8000/api/users/' + email, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário.');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário excluído com sucesso!');
        document.getElementById('deleteEmail').value = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}

// Função para exibir os detalhes de uma pessoa pelo nome
function showUserInfoByName() {
    var name = document.getElementById('searchName').value.trim();

    // Verifica se o nome não está vazio
    if (name !== '') {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', '/users/details/' + encodeURIComponent(name), true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                var userDetails = JSON.parse(xhr.responseText);
                // Supondo que "name" e "email" sejam campos do usuário
                document.getElementById('userDetails').innerHTML = `
                    <p>Nome: ${userDetails.name}</p>
                    <p>Email: ${userDetails.email}</p>
                `;
                document.getElementById('userInfo').style.display = 'block';
            } else {
                document.getElementById('message').innerText = 'Erro ao buscar detalhes do usuário.';
            }
        };
        console.log('user', xhr)
        xhr.send();
    } else {
        document.getElementById('message').innerText = 'Por favor, insira um nome de usuário válido.';
    }
}




// Função para obter a lista de usuários e exibi-la
function showUserList() {
    fetch('http://127.0.0.1:8000/api/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter a lista de usuários.');
        }
        return response.json();
    })
    .then(users => {
        var userList = document.getElementById('userList');
        var userTable = document.getElementById('userTable');

        // Limpar a tabela antes de adicionar novas linhas
        userTable.innerHTML = '';

        users.forEach(user => {
            var row = userTable.insertRow();
            var emailCell = row.insertCell(0);
            var nameCell = row.insertCell(1);
            emailCell.innerHTML = user.email;
            nameCell.innerHTML = user.name;
        });
        userTable.style.display = 'block'; // Mostra a tabela de usuários
    })
    .catch(error => {
        console.error('Erro:', error);
        alert(error.message);
    });
}
