const CREATE_BUTTON = document.querySelector("#create")
const SAVE_BUTTON = document.querySelector("#save")
const BACK_BUTTON = document.querySelector("#back")
const ENTRY_TEXT = document.querySelector("#entry") // text area

const EDITOR = document.querySelector(".editor")
const DATE = document.querySelector("#date-picker")

const SELECTOR = document.querySelector(".selector")
const DISPLAY = document.querySelector(".display")
const PREVIEW = document.querySelector(".preview")
const MENU = document.querySelector(".menu")

const VIEWING_LABEL = document.querySelector("#viewing")

let storage = {} 

// inital storage load

if (localStorage.getItem("entries") != null) {
    let storedItems = JSON.parse(localStorage.getItem("entries"))

    for (const [date, text] of Object.entries(storedItems)) {
        storage[date] = text
        addButton(date)
    }
}

function addButton(date) {
    // create a entry button
    let entryButton = document.createElement("button")
    entryButton.classList.add("entry-selector")
    entryButton.textContent = date

    // give button functionality
    entryButton.addEventListener("click", () => {
        VIEWING_LABEL.innerHTML = "Currently viewing: " + date

        MENU.style.display = "none"
        EDITOR.style.display = "none"
        DISPLAY.style.display = "flex"

        PREVIEW.innerHTML = storage[date]
    })

     // add button to the selector reel
     SELECTOR.appendChild(entryButton)
}

function saveEntry() {
    // save current date
    let currentDate = DATE.value

    if (!currentDate) {
        alert("Pick a date for this entry!")
        return
    }
    else if (storage[currentDate]) {
        alert("An entry for this date has already been saved")
        return
    }

    // bind the current date to the text saved & save
    storage[currentDate] = ENTRY_TEXT.value
    localStorage.setItem("entries", JSON.stringify(storage))
   
    // generate button
    addButton(currentDate)
    
    // hide the editor
    MENU.style.display = "flex"
    EDITOR.style.display = "none"
}
 
SAVE_BUTTON.addEventListener("click", saveEntry)

CREATE_BUTTON.addEventListener("click", () => {
    ENTRY_TEXT.value = ""

    DISPLAY.style.display = "none"
    MENU.style.display = "none"
    EDITOR.style.display = "flex"
} )

BACK_BUTTON.addEventListener("click", () => {
    DISPLAY.style.display = "none"
    MENU.style.display = "flex"
})