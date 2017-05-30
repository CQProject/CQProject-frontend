// Used to toggle the menu on smaller screens when clicking on the menu button
function accordion(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}

var currentX;
function inicCurrentList() {
    currentX = document.getElementById("classes");
    currentX.className = currentX.className.replace(" w3-hide", " w3-show");
}

function listChooser(id) {
    var x = document.getElementById(id);
    if (x != currentX) {
        x.className = x.className.replace(" w3-show", " w3-hide");
        currentX = x;
        x.className = x.className.replace(" w3-hide", " w3-show");
    }
}

var myIndex = 0;

function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) { myIndex = 1 }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 2500);
}