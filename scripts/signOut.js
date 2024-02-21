//if there is a cookie with loggedIn=true, return true
function isLoggedIn() {
    return document.cookie.split(";").some(cookie => cookie == "loggedIn=true");
}

//sign out the user and clear cookie and local storage
function signOut() {
    localStorage.clear();

    //clear cookie by putting expires to past date
    document.cookie = "loggedIn=; expires=Sat, 01 Jan 2000 00:00:00 GMT; path=/";
    document.cookie = "email=; expires=Sat, 01 Jan 2000 00:00:00 GMT; path=/";
    document.cookie = "password=; expires=Sat, 01 Jan 2000 00:00:00 GMT; path=/";

    //return the user to sign in page
    window.location.href = "../index.html";
}

//return the user to sign in page if he is not logged in
if (!isLoggedIn()) {
    signOut();
}

const signOutButton = document.querySelector(".sign-out");

signOutButton.addEventListener("click", () => {
    signOut();
});
