add = () =>{
    var input= document.getElementById ("addReview").value;
    if (input==""){
        alert("Please review can not be empty");
        return false;
    }
    
}
validateForm = () =>{
    var username = document.forms["myForm"]["username"].value;
    if (usename == "") {
        alert("Username must be filled out");
        return false;
    }
    var password = document.myForm.password.value;
    if (password == "") {
        window.alert("Password must be filled out");
        return false;
    }
    var retype_password = document.myForm.retype_password.value;
    if (retype_password != password) {
        window.alert("Password must Tally");
        return false;
    }
    var email=document.myForm.email.value;
    if (email == ""){
        window.alert("Please enter your e-mail address.");
        email.focus();
        return false;
    }

    if (email.indexOf("@", 0) < 0){
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
    }

    if (email.indexOf(".", 0) < 0){
    window.alert("Please enter a valid e-mail address.");
    email.focus();
    return false;
    }

return true;
}