const signInButton = document.querySelector(".signin-button");

signInButton.addEventListener("click", () => {

    const email = document.getElementById("inputEmail").value;
    const password = document.getElementById("inputPassword").value;

    //checking inputs, if anything is wrong, alert and return
    if (!email.includes("@")) {
        alert("Invalid email address! example: myname@google.com");
        return;

    } else if (!email.split("@")[1].includes(".")) {
        //email needs to contain . after @
        alert("Invalid email address! example: myname@google.com");
        return;

    } else if (password.length < 8) {
        alert("Password too short! minimum 8 characters");
        return;

    } else if (! /[0-9]/.test(password)) {
        //if there is a number, regex returns true
        alert("Password needs to contain at least one number!");
        return;

    } else if (! /[A-Z]/.test(password)) {
        //if there is a uppercase letter, regex returns true
        alert("Password needs at least one uppercase letter!");
        return;

    } else if (! /[a-z]/.test(password)) {
        //if there is a lowercase letter, regex returns true
        alert("Password needs at least one lowercase letter!");
        return;

    } else if (! /[`!@#$%^&*()_\-+=\[\]{};':"\\|<>,.\/?~ ]/.test(password)) {
        //if there is one of these special charachters, regex returns true
        alert("Password needs at least one special character!");
        return;

    }
    //if everything is ok we proceed to login

    //setting cookie to indicate user is logged in	
    document.cookie = "loggedIn=true";

    //adding user info to cookie
    document.cookie = `email=${email}`;
    document.cookie = `password=${password}`;

    //procced to manager
    if (isLoggedIn()){
        window.location.href = "../pages/manager.html";
    } else {
       console.log("error");
    }
});

//if there is a cookie with loggedIn=true, return true
function isLoggedIn() {
    return document.cookie.split(";").some(cookie => cookie == "loggedIn=true");
}