document.addEventListener("DOMContentLoaded", function(){

    console.log("StayWise frontend loaded");

});

/* ============================= */
/* SIMPLE LOGIN HANDLER */
/* ============================= */

function loginUser(e){
    e.preventDefault();

    const email = document.querySelector("input[type='email']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();

    if(email === "" || password === ""){
        alert("Please enter email and password");
        return false;
    }

    // simple demo login
    if(email === "admin@staywise.com" && password === "123456"){
        window.location.href = "/home";
    } else {
        alert("Invalid credentials");
    }

    return false;
}

/* ============================= */
/* LOGOUT FUNCTION */
/* ============================= */

function logoutUser(){
    window.location.href = "/";
}

/* ============================= */
/* SUPPORT FORM */
/* ============================= */

function submitSupport(e){
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if(name === "" || email === "" || subject === "" || message === ""){
        alert("All fields are required");
        return false;
    }

    document.getElementById("supportMsg").innerHTML =
        "<span style='color:green;'>Support request submitted successfully.</span>";

    document.querySelector("form").reset();

    return false;
}
