
// create a simple class with a 

function redirect() {
    var dropdown = document.getElementById('dropdown');
    var selected = dropdown.options[dropdown.selectedIndex].text;
    if (selected == "Homework 1") {
        window.location.href = "./src/homework1/index.html";
    }

    if (selected == "Homework 2") {
        window.location.href = "./src/homework2/index.html";
    }
    if (selected == "Homework 3") {
        window.location.href = "./src/homework3/index.html";
    }
}
