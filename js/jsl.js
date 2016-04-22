/**
 * Created by master on 01.03.16.
 */
var listenersSet;

// a function that reacts to the selection of a list item
function onListItemSelected(event) {
    // check in which phase we are
    if (event.eventPhase == Event.BUBBLING_PHASE) {
        // a helper function that looks up the target li element of the event
        function lookupEventTarget(el) {
            if (el.classList.contains("option")||el.classList.contains("option2" )){
                return el;
            }
            if (el.tagName.toLowerCase() == "li") {
                return el;
            }
            else if (el.tagName.toLowerCase() == "ul") {
                console.warn("lookupEventTarget(): we have already reached the list root!");
                return null;
            }
            else if (el.parentNode) {
                return lookupEventTarget(el.parentNode);
            }
        }

        // lookup the target of the event
        var eventTarget = lookupEventTarget(event.target);
        if(eventTarget.classList.contains("option") || eventTarget.classList.contains("option2")){
            while (eventTarget.tagName.toLowerCase()!="li") {
                eventTarget=eventTarget.parentNode;
            }
            // var name = eventTarget.getElementsByTagName("h3")[0].textContent;
            //  var src = eventTarget.getElementsByTagName("h2")[1].textContent;
            //  alert(name+" "+src);
            eventTarget.remove();
        }
        else if(eventTarget){
            // from the eventTarget, we find out the title of the list item, which is simply the text content of the li element
            // showToast("selected: " + eventTarget.textContent);
            // showToast("selected: " + titel);
            var name = eventTarget.getElementsByTagName("h3")[0].textContent;
            alert(name);
        }
        else {
            showToast("list item target of event could not be determined!");
        }
    }
}

function toggleListeners() {
    // we set an onclick listener on the list view and check from which item the event was generated
    // we also set a listener on the '+'-button that loads content from the server!
    var ul = document.getElementsByTagName("ul")[0];
    var newItem = document.querySelector(".new-item");

    document.getElementsByTagName("body")[0].classList.toggle("listeners-active");

    if (listenersSet) {
        newItem.removeEventListener("click",loadNewItems);
        newItem.setAttribute("disabled","disabled");
        console.log("newItem.disabled: " + newItem.disabled);
        ul.removeEventListener("click", onListItemSelected);
        showToast("event listeners have been removed");
        listenersSet = false;
    }
    else {
        newItem.addEventListener("click",loadNewItems);
        newItem.removeAttribute("disabled");
        console.log("newItem.disabled: " + newItem.disabled);
        ul.addEventListener("click", onListItemSelected);
        showToast("event listeners have been set");
        listenersSet = true;
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
/* show a toast and use a listener for transitionend for fading out */
function showToast(msg) {
    var toast = document.querySelector(".toast");
    if (toast.classList.contains("active")) {
        console.info("will not show toast msg " + msg + ". Toast is currently active, and no toast buffering has been implemented so far...");
    }
    else {
        console.log("showToast(): " + msg);
        toast.textContent = msg;
        /* cleanup */
        toast.removeEventListener("transitionend",finaliseToast);
        /* initiate fading out the toast when the transition has finished nach Abschluss der Transition */
        toast.addEventListener("transitionend", fadeoutToast);
        toast.classList.add("shown");
        toast.classList.add("active");
    }
}

function finaliseToast(event) {
    var toast = event.target;
    console.log("finaliseToast(): " + toast.textContent);
    toast.classList.remove("active");
}

/* trigger fading out the toast and remove the event listener  */
function fadeoutToast(event) {
    var toast = event.target;
    console.log("fadeoutToast(): " + toast.textContent);
    /* remove tranistionend listener */
    toast.addEventListener("transitionend", finaliseToast);
    toast.removeEventListener("transitionend", fadeoutToast);
    toast.classList.remove("shown");
}

