let mainMenuButtons = document.getElementsByClassName('mainMenuButton');
let mainMenuButtonsArray = Array.from(mainMenuButtons);
mainMenuButtonsArray.forEach(b => b.addEventListener('click', mainMenu));

function mainMenu(){
    window.location.href = '../index.html';
}
