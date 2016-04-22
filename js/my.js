/**
 * Created by master on 01.03.16.
 */

var myListItems = [
{
    "name": "sed",
    "owner": "lorempixel,com",
    "added": "15.01.2016",
    "numOfTags": 9,
    "src": "http://lorempixel.com/200/200"
},
{
    "name": "adispicing",
    "owner": "lorempixel.com",
    "added": "29.02.2016",
    "numOfTags": 0,
    "src": "http://lorempixel.com/200/150"
},
{
    "name": "consectetur",
    "owner": "lorempixel,com",
    "added": (new Date()).toLocaleDateString(),
    "numOfTags": 2,
    "src": "http://lorempixel.com/150/200"
}];

function createListElementForContentItem(akt) {
    var item = akt;
    var li = document.createElement("li");

    var divleft = document.createElement("div");
    divleft.setAttribute("class", "left-part");
    li.appendChild(divleft);

    var img = document.createElement("img");
    img.src = item.src;
    divleft.appendChild(img);

    var divoption = document.createElement("div");
    divoption.setAttribute("class", "button option2");
    divleft.appendChild(divoption);

    var divtop = document.createElement("div");
    divtop.setAttribute("class", "topdiv");
    li.appendChild(divtop);

    var h2r = document.createElement("h2");
    h2r.textContent = item.added;
    h2r.setAttribute("class", "right-part");
    divtop.appendChild(h2r);

    var h2 = document.createElement("h2");
    h2.textContent = item.owner;
    divtop.appendChild(h2);

    var h3 = document.createElement("h3");
    h3.textContent = item.name;
    divtop.appendChild(h3);

    var divbottom = document.createElement("div");
    divbottom.setAttribute("class", "bottomdiv");
    li.appendChild(divbottom);

    var divplay = document.createElement("div");
    divplay.setAttribute("class", "button play");
    divbottom.appendChild(divplay);

    var divoption = document.createElement("div");
    divoption.setAttribute("class", "button option");
    divbottom.appendChild(divoption);

    var tags = document.createElement("h2");
    tags.textContent = item.numOfTags;
    tags.setAttribute("class", "button play");
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

window.addEventListener('DOMContentLoaded', createNewItems);

// Ansicht zwischen Liste und Kacheln umschalten
function switchView(){
    var mainDiv = document.getElementById("mainDiv");

    if(mainDiv.getAttribute("class") == "main myListView"){
        mainDiv.className="main myThumbView";
    }else{
        mainDiv.className="main myListView";
    }
}

/* main ausblenden, Ansicht wechseln und wieder einblenden */
function changeMain(msg) {
    var main = document.querySelector(".main");
    if (main.classList.contains("active")) {
        console.info("will not show toast msg " + msg + ". Toast is currently active, and no toast buffering has been implemented so far...");
    }
    else {
        console.log("showToast(): " + msg);
        //main.textContent = msg;
        /* cleanup */
        main.removeEventListener("transitionend",fadeoutMain);
        /* initiate fading out the toast when the transition has finished nach Abschluss der Transition */
        main.addEventListener("transitionend", fadeinMain);
        main.classList.add("change");
        main.classList.add("active");
    }
}

function fadeoutMain(event) {
    var main = event.target;
    console.log("finaliseToast(): " + main.textContent);
    main.classList.remove("active");

}

/* trigger fading out the toast and remove the event listener  */
function fadeinMain(event) {
    var main = event.target;
    console.log("fadeoutToast(): " + main.textContent);
    /* remove tranistionend listener */
    main.addEventListener("transitionend", fadeoutMain);
    main.removeEventListener("transitionend", fadeinMain);

    var mainDiv = document.getElementById("mainDiv");

    if(mainDiv.classList.contains("myListView")){
        mainDiv.classList.remove("myListView");
        mainDiv.classList.add("myThumbView")
    }else{
        mainDiv.classList.remove("myThumbView");
        mainDiv.classList.add("myListView")
    }

    main.classList.remove("change");
}

// Umschalten bei Klick auf Button (div)
/*
window.onload = function() {
    document.getElementsByClassName("button toggleView")[0].addEventListener("click", changeMain);
}*/
