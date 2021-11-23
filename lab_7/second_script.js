function init() {

    var parent = document.getElementsByClassName("demo");
    
  
    for(let key in localStorage) {
      
      

      var regex = "(.*)prdc";

      if(key.match(regex)) {

        console.log(`${key}: ${localStorage.getItem(key)}`);

        var div = document.createElement('div');
        div.id = key;
        div.innerHTML = localStorage.getItem(key);
        parent[0].appendChild(div);
      }
    }

    var line = document.createElement('div');
    line.innerHTML = "___________________________________";
    parent[0].appendChild(line);

    var div = document.createElement('div');

    if(localStorage.getItem("total") != null)
        div.innerHTML = "Total price: $" + localStorage.getItem("total");
    else 
        div.innerHTML = "Total price: $0";

    parent[0].appendChild(div);

  
}

function clearCart() {
    localStorage.clear();
    document.location.reload();
}
  