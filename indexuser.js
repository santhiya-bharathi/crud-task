document.body.innerHTML= `<div>
    <input class="add-user-name" placeholder = "Enter your name"/>
    <input class = "add-user-avatar" placeholder="Enter your pic url"/>
    
    <a onclick = "addUser()" class="waves-effect waves-light btn">ADD USER</a>
</div>
<section class= "user-list"></section>`;
async function getAllUsers(){
    const data = await fetch(
        "https://616d58f537f997001745d9d1.mockapi.io/users",
        {method: "GET"}
    );
    const users = await data.json();
    const userContainer = document.querySelector(".user-list");
    userContainer.innerHTML= "";
    users.forEach((user)=>{
        userContainer.innerHTML +=`
        <div class = "user-container">
        <img class = "user-avatar" src= "${user.avatar}" alt = "${user.name}"/>
        <div>
        <p class = "user-name">${user.name}</p>
        <a onclick = "toggleEdit(${user.id})" class="waves-effect waves-light btn">EDIT</a>
        <a onclick = "deleteUser(${user.id})" class="waves-effect waves-light btn">DELETE</a>
        
        <div class = "edit-user-form edit-${user.id}">
        <input value = "${user.name}" class = "edit-${user.id}-user-name" placeholder="enter your name"/>
        <input value = "${user.avatar}" class = "edit-${user.id}-user-avatar" placeholder="enter your pic"/>
      
        <a onclick="saveUser(${user.id})" class="waves-effect waves-light btn">save</a>
        </div>
        </div>
        </div>
        `;
    });
    console.log(users);
}
getAllUsers();
{/* <button onclick = "toggleEdit(${user.id})">EDIT</button> */}
{/* <button onclick = "deleteUser(${user.id})">DELETE</button> */}
{/* <button onclick = "addUser()">ADD USER</button> */}
{/* <button onclick="saveUser(${user.id})">save</button> */}
async function deleteUser(userId){
    const data = await fetch(
        "https://616d58f537f997001745d9d1.mockapi.io/users/" + userId,
        {method: "DELETE"}
    );
    getAllUsers();
}

async function addUser(){
    const userName = document.querySelector(".add-user-name").value;
    const userAvatar = document.querySelector(".add-user-avatar").value;

    const data = await fetch("https://616d58f537f997001745d9d1.mockapi.io/users",
    {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name: userName, avatar: userAvatar}),
    }
    );
    getAllUsers();
}

function toggleEdit(userId){
    const editUserForm = document.querySelector(`.edit-${userId}`);
    editUserForm.style.display = editUserForm.style.display === "block" ? "none":"block";
}

async function saveUser(userId){
    const userName = document.querySelector(`.edit-${userId}-user-name`).value;
    const userAvatar = document.querySelector(`.edit-${userId}-user-avatar`).value;

    const data = await fetch("https://616d58f537f997001745d9d1.mockapi.io/users/" + userId,
    {
        method: "PUT",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({name: userName, avatar: userAvatar}),
    }
    );

    getAllUsers();
}