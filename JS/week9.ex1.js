console.log ("hello")

function showGreetingMessage(){    
    let name = window.prompt("What is your name?")
    window.alert("hello"+name);
}
//showGreetingMessage();

document.querySelector('#btn').addEventListener('click',showGreetingMessage);