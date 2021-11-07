// Get the elements with class="column"
var elements = document.getElementsByClassName("column");
var pics = document.getElementsByClassName("img_list");
var desc = document.getElementsByClassName("desc");
var title = document.getElementsByClassName("title");
var additional = document.getElementsByClassName("additional");

// Declare a loop variable
var i;

// List View
function listView() {

    

  for (i = 0; i < elements.length; i++) {

    elements[i].style.width = "100%";

    pics[i].style.width = "5%";
    pics[i].style.height = "5%";

    

    additional[i].style.display = "none";
    title[i].style.display = "none";

    desc[i].style.display = "inline";
    
  }

}

// Grid View
function gridView() {

   

  for (i = 0; i < elements.length; i++) {

    elements[i].style.width = "25%";

    pics[i].style.width = "100%";
    pics[i].style.height = "100%";

    

    additional[i].style.display = "inline";
    title[i].style.display = "flex";

    desc[i].style.display = "none";
    
  }

}

/* Optional: Add active class to the current button (highlight it) */
var container = document.getElementById("btnContainer");
var btns = container.getElementsByClassName("btn");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}