/**
 * Created by master on 01.03.16.
 */

var myListItems;
var myNewItem =
{
    "name": "sedassdasd",
    "owner": "lorempixel.com",
    "added": (new Date()).toLocaleDateString(),
    "numOfTags": 9,
    "src": "http://lorempixel.com/200/200"
};

function createListElementForContentItem(akt) {
    var item = akt;
    var li = document.createElement("li");

    var divleft = document.createElement("div");
    divleft.className = "left-part";
    li.appendChild(divleft);

    var img = document.createElement("img");
    img.src = item.src;
    divleft.appendChild(img);

    var divoption2 = document.createElement("div");
    divoption2.className = "button option2";
    divleft.appendChild(divoption2);

    var divtop = document.createElement("div");
    divtop.className = "topmidbotdiv";
    li.appendChild(divtop);

    var added = document.createElement("h2");
    added.textContent = item.added;
    added.className = "added right-part";
    divtop.appendChild(added);

    var owner = document.createElement("h2");
    owner.textContent = item.owner;
    owner.className = "owner";
    divtop.appendChild(owner);

    var divmid = document.createElement("div");
    divmid.className = "topmidbotdiv";
    li.appendChild(divmid);

    var name = document.createElement("h3");
    name.textContent = item.name;
    name.className = "name";
    divmid.appendChild(name);

    var divbottom = document.createElement("div");
    divbottom.className = "topmidbotdiv";
    li.appendChild(divbottom);

    var divplay = document.createElement("div");
    divplay.className = "button play";
    divbottom.appendChild(divplay);

    var divoption = document.createElement("div");
    divoption.className = "button option";
    divbottom.appendChild(divoption);

    var tags = document.createElement("h2");
    tags.textContent = item.numOfTags;
    tags.className = "numOfTags";
    divbottom.appendChild(tags);

    // add the element to the list
    var listroot = document.getElementsByTagName("ul")[0];
    listroot.appendChild(li);
}

function loadNewItems() {

    // we initiate an xmlhttprequest and read out its body
    xhr("GET","data/listitems.json",null,function(xhr) {
        var textContent = xhr.responseText;
        console.log("loaded textContent from server: " + textContent);
        var jsonContent = JSON.parse(textContent);

        // we assume jsonContent is an array and iterate over its members
        jsonContent.forEach(createListElementForContentItem);

    });

}

function createNewItems(){
    myListItems.forEach(createListElementForContentItem);
}

window.addEventListener('DOMContentLoaded', loadNewItems);

function reload(){
    //location.reload(true);
    var element = document.getElementById("liste");
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
    loadNewItems();
}

function addItem(){
    createListElementForContentItem(myNewItem);
}

// addListeners onload
window.onload = function() {
    // Reload Liste
    document.getElementsByClassName("button refresh")[0].addEventListener("click", reload);
    // Add Item
    document.getElementsByClassName("button new-item")[0].addEventListener("click",addItem);
    // alert Titel bei Klick auf li
    document.getElementById('liste').addEventListener("click",onListItemSelected);
    // toggle View
    document.getElementsByClassName("button toggleView")[0].addEventListener("click",changeMain);
};
