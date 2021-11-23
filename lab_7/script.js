// Get the elements with class="column"
var elements = document.getElementsByClassName("column");
var pics = document.getElementsByClassName("img_list");
var desc = document.getElementsByClassName("desc");
var title = document.getElementsByClassName("title");
var additional = document.getElementsByClassName("additional");

/*Pagination*/
var count = elements.length; //всего записей
var cnt = 8; //сколько отображаем сначала
var cnt_page = Math.ceil(count / cnt); //кол-во страниц

var paginator = document.querySelector(".paginator");
var page = "";

/* Optional: Add active class to the current button (highlight it) */
var container = document.getElementById("btnContainer");
var btns = container.getElementsByClassName("btn");




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

//buytons
for (var i = 0; i < btns.length-2; i++) {
    
    btns[i].addEventListener("click", function() {
      var current = document.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
}
//pagination
for (var i = 0; i < cnt_page; i++) {
  page += "<span class=\"pages_span\" data-page=" + i * cnt + "  id=\"page" + (i + 1) + "\">" + (i + 1) + "</span>";
}
paginator.innerHTML = page;

//All the columns
var div_num = document.querySelectorAll(".column");
for (var i = 0; i < div_num.length; i++) {
  if (i < cnt) {
    div_num[i].style.display = "block";
  }
}

var main_page = document.getElementById("page1");
main_page.classList.add("paginator_active");
var availibilityButton = btns[3];
var orderButton = btns[2];
var availOnly = false;
var sortOnly = false;

//pagination logic
function pagination(event) {

  var e = event || window.event;
  var target = e.target;
  var id = target.id;
  
  if (target.tagName.toLowerCase() != "span") return;
  
  var data_page = +target.dataset.page;
  main_page.classList.remove("paginator_active");
  main_page = document.getElementById(id);
  main_page.classList.add("paginator_active");

  if(data_page > 0) {
    for (var i = 0; i < data_page; i++) {
      div_num[i].style.display = "none";
    }
  }

  if(data_page+cnt < count) {
    for (var i = data_page+cnt; i < count; i++) {
      div_num[i].style.display = "none";
    }
  }
  
  
  for (var i = data_page; i < data_page+cnt; i++) {
      div_num[i].style.display = "block";
  }

  availibilityButton.className = "btn";

}

//pagination span numbers
let list = document.getElementsByClassName("pages_span");

function hidePagination() {
  for(var i = 0; i < cnt; ++i) {
    list[i].style.display = "none";
  }
}

function showPagination() {
  if(!availOnly && !sortOnly) {
    for(var i = 0; i < cnt; ++i) {
      list[i].style.display = "inline-block";
    }

    main_page.classList.remove("paginator_active");

    main_page = document.getElementById("page1");
    main_page.classList.add("paginator_active");
  }
}

function sortByAvailibility() {
  
  if(availibilityButton.className != "btn active") {

    availOnly = true;
    availibilityButton.className = "btn active";

    for (var i = 0; i < count; i++) {

      if(div_num[i].getAttribute("value") == "true") {
        div_num[i].style.display = "block";
      
      }
      else {
        div_num[i].style.display = "none";
      }
      
    }

    hidePagination();

  }
  else {

    availOnly = false;
    availibilityButton.className = "btn";

    for (var i = 0; i < cnt; i++) {
      div_num[i].style.display = "block"
    }
    for (var i = cnt + 1; i < count; i++) { 
      div_num[i].style.display = "none";
    }

    showPagination();
  }

}

function sorter(a,b) {
    let first = parseInt(a.getAttribute("price"), 10);
    let second = parseInt(b.getAttribute("price"), 10);

    console.log(first + "\n" + second);

    if(first < second) return -1;
    if(first > second) return 1;
    return 0;
}

function sortByPrice() {

  if(orderButton.className != "btn active") {

    sortOnly = true;
    var categoryItemsArray = Array.from(elements);
    let sorted = categoryItemsArray.sort(sorter);


    orderButton.className = "btn active";

    var parent = document.getElementsByClassName("demo");
    parent[0].innerHTML = '';

    sorted.forEach(element => {
      element.className = "column shown";
    });

    var div;
    for(var i = 0; i < sorted.length; ++i) {
      
      if(i % 4 == 0) {

        div = document.createElement('div');
        div.className = 'row';

        parent[0].appendChild(div);
      }

      div.appendChild(sorted[i]);

    }

   hidePagination();


  }
  else {
    orderButton.className = "btn";
    sortOnly = false;
    showPagination();
  }
}

countCart = 0;
totalSum = 0;


function redrawCart() {
  var countValueNode = document.getElementsByClassName("badge");
  countValueNode[0].innerHTML = countCart;

  var total = document.getElementsByClassName("main-color-text");
  total[0].innerHTML = "$" + totalSum;

}

function addTocart(event) {

  
  var node = event.target;
  var desc = node.parentNode.nextElementSibling.innerHTML;
  var price = node.parentNode.parentNode.getAttribute("price");

  alert("The items " + desc + " was added to your cart!");

  if(price) {
    totalSum += parseInt(price, 10);
    countCart++;
    localStorage.setItem(countCart+"_prdc", desc);
    localStorage.total = totalSum;

    redrawCart();
  }
  
}

function toCart(event) {

  alert("You serfed to Cart!");
  window.location.href = 'index_cart.html';
  
}

