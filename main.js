
const SAVE_BUTTON = document.querySelector("#save")
const ENTRY_TEXT = document.querySelector("#entry")
const SELECTOR = document.querySelector(".selector")
const DATE = document.querySelector("#date-picker")

let storage = {} 

function saveEntry() {
    // check for any ones
    // check if a date is chosen
    if (!DATE.value) {
        alert("Pick a date for this entry!")
        return
    }
    else if (storage[DATE.value]) {
        alert("An entry for this date has already been saved")
        return
    }

    // bind the current date to the text saved.
    storage[DATE.value] = ENTRY_TEXT.value
    // create a entry button
    let entryButton = document.createElement("button")
    entryButton.classList.add("entry-selector")
    entryButton.textContent = DATE.value
    // add button to the selector reel
    SELECTOR.appendChild(entryButton)
}

// watch for any events
SAVE_BUTTON.addEventListener("click", saveEntry)