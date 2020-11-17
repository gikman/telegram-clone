const controlChat = document.getElementById('control-chat');
const sendBtn = document.querySelector('.send-btn');
const messageInput = document.getElementById('input2');
const nameInput = document.getElementById('name-input');
const messageContainer = document.querySelector('.message-container');


//Get username from URL
const { username } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


function play() {
    var audio = new Audio('/telegram_sound.mp3');
    if (audio.paused) {
        audio.play();
    }else{
        audio.currentTime = 0
    }
};


const socket = io();

//Join chatroom
socket.emit('joinRoom', {username});

//Message from server
socket.on('message', message => {
    console.log(message);
    outputMessage(message);

    play();



    //Scroll down
    messageContainer.scrollTop = messageContainer.scrollHeight;
});

socket.on('ourmessage', message => {
    console.log(message);
    ouroutputMessage(message);

    play();

    //Scroll down
    messageContainer.scrollTop = messageContainer.scrollHeight;
});


//Message submit 
controlChat.addEventListener('submit', (e) => {
    e.preventDefault();

    const messageInput = e.target.elements.input2.value;

    socket.emit('chatMessage', messageInput);

    //Clear input
    e.target.elements.input2.value = '';
    e.target.elements.input2.focus();
});



//Output message to DOM
function outputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message-friend')
    div.innerHTML = `<div class="img-main"><img class="message-img" src="/image/pavel.jpg" alt=""></div>
    <div class="message-name" >${message.username}</div>
    <div class="message-time">${message.time}</div>
    <div class="message">
        ${message.text}
    </div>`
    document.querySelector('.message-container').appendChild(div);
};

function ouroutputMessage(message) {
    const div = document.createElement('div');
    div.classList.add('message-friend')
    div.innerHTML = `<div class="img-main"><img class="message-img" src="/image/sticker.png" alt=""></div>
    <div class="message-name" >${message.username}</div>
    <div class="message-time">${message.time}</div>
    <div class="message">
        ${message.text}
    </div>`
    document.querySelector('.message-container').appendChild(div);
};







// ROOM INTERFACE
const contact = document.querySelectorAll('.contact');
const menubtn = document.getElementById('menu');
const menulist = document.getElementById('menu-list');
let menuopen = true;


menubtn.addEventListener('click', () => {
    if (menulist.style.display === "none") {
        menulist.style.display = "block";
    } else {
        menulist.style.display = "none"
    }
});
menubtn.addEventListener('click', () => {
    if (!menuopen) {
        menubtn.classList.add('open');
        menuopen = true;
    } else {
        menubtn.classList.remove('open');
        menuopen = false;
    }
});

contact.forEach(function(cont){
    cont.addEventListener('click', () => {
    if (cont.style.color === "black") {
        cont.style.color = "white";
    } else {
        cont.style.color = "black"
    }
    });
});

contact.forEach(function(cont){
    cont.addEventListener('click', () => {
    if (cont.style.backgroundColor === "white") {
        cont.style.backgroundColor = "rgba(25, 96, 155, 0.658)";
    } else {
        cont.style.backgroundColor = "white"
    }
    });
});
    

