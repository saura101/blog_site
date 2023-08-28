console.log(localStorage.getItem("tog_val"));
if(localStorage.getItem("tog_val") == "true") {
    document.body.classList.add("dark");
    document.getElementById("navbar").classList.add("navbar-inverse");
    document.getElementById("checkbox").checked = true;
}

const checkbox = document.getElementById("checkbox");
//console.log(checkbox);
checkbox.addEventListener('change', ()=> {
    console.log(document.getElementById("checkbox").checked);
    localStorage.setItem("tog_val",document.getElementById("checkbox").checked);
    console.log(localStorage.getItem("tog_val"));
    if(document.getElementById("checkbox").checked) {
        document.body.classList.add("dark");
        document.getElementById("navbar").classList.add("navbar-inverse");
    } else {
        document.body.classList.remove("dark");
        document.getElementById("navbar").classList.remove("navbar-inverse");
    }
    
});
