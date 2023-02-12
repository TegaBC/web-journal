const CREATE_BUTTON = document.querySelector("#create")
const SAVE_BUTTON = document.querySelector("#save")
const BACK_BUTTON = document.querySelector("#back")
const DELETE_BUTTON = document.querySelector("#delete")
const EDIT_BUTTON = document.querySelector("#edit")
const SAVE_EDIT_BUTTON = document.querySelector("#save-edit")

const EDITOR_BUTTONS = [SAVE_EDIT_BUTTON, BACK_BUTTON, DELETE_BUTTON, EDIT_BUTTON]

const ENTRY_TEXT = document.querySelector("#entry") // text area
const EDIT_ENTRY_AREA = document.querySelector("#edit-entry")

const EDITOR = document.querySelector(".editor")
const DATE = document.querySelector("#date-picker")

const SELECTOR = document.querySelector(".selector")
const DISPLAY = document.querySelector(".display")
const PREVIEW = document.querySelector(".preview")
const MENU = document.querySelector(".menu")

const VIEWING_LABEL = document.querySelector("#viewing")

let currentViewing = null

let reelButtons = {}
let storage = {} 

// inital storage load

if (localStorage.getItem("entries") != null) {
    let storedItems = JSON.parse(localStorage.getItem("entries"))

    for (const [date, text] of Object.entries(storedItems)) {
        storage[date] = text
        addButton(date)
    }
}

function saveStorage() {
    localStorage.setItem("entries", JSON.stringify(storage))
}

function addButton(date) {
    // create a entry button
    let entryButton = document.createElement("button")
    entryButton.classList.add("entry-selector")
    entryButton.textContent = date

    // give button functionality
    entryButton.addEventListener("click", () => {
        // Set label 
        VIEWING_LABEL.innerHTML = date

        // Set what displays
        MENU.style.display = "none"
        EDITOR.style.display = "none"
        EDIT_ENTRY_AREA.style.display = "none"
        PREVIEW.style.display = "flex"
        DISPLAY.style.display = "flex"

        // Push saved text to screen
        PREVIEW.innerHTML = storage[date]

        // Update what we are viewing
        currentViewing = date

        // make sure we are seeing the correct buttons
        EDITOR_BUTTONS.forEach((button) => {
            button.style.display = "inline-block"
        })

        SAVE_EDIT_BUTTON.style.display = "none"
    })

     // add button to the selector reel
     reelButtons[date] = entryButton
     SELECTOR.appendChild(entryButton)
}

function editButton() {
    // get current text
    let entryText = storage[currentViewing]

    // display edit box
    PREVIEW.style.display = "none"
    EDIT_ENTRY_AREA.style.display = "flex"
    
    EDIT_ENTRY_AREA.innerHTML = entryText
 
    // hide all buttons, except save
    EDITOR_BUTTONS.forEach((button) => {
        button.style.display = "none"
    })

    SAVE_EDIT_BUTTON.style.display = "inline-block"
    // back to menu like normal
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
    else if (ENTRY_TEXT.value == "") {
        alert("Entries can not be empty.")
        return
    }

    // bind the current date to the text saved & save
    storage[currentDate] = ENTRY_TEXT.value
    saveStorage()
   
    // generate button
    addButton(currentDate)
    
    // hide the editor
    MENU.style.display = "flex"
    EDITOR.style.display = "none"
}
 
function saveEdit() {
    let newText = EDIT_ENTRY_AREA.value

    // save text
    storage[currentViewing] = newText
    saveStorage()

    // update preview text
    PREVIEW.innerHTML = newText

    // show the entry like normal, make editor go away
    EDIT_ENTRY_AREA.style.display = "none"
    PREVIEW.style.display = "flex"
    DISPLAY.style.display = "flex"

    // show correct buttons
    EDITOR_BUTTONS.forEach((button) => {
        button.style.display = "inline-block"
    })

    SAVE_EDIT_BUTTON.style.display = "none"
}

SAVE_EDIT_BUTTON.addEventListener("click", saveEdit)
SAVE_BUTTON.addEventListener("click", saveEntry)
EDIT_BUTTON.addEventListener("click", editButton)

DELETE_BUTTON.addEventListener("click", () => {
    // remove from storage and save
    storage[currentViewing] = null
    delete storage[currentViewing]
    saveStorage()

    // remove button from reel
    reelButtons[currentViewing].remove()

    // set display styling
    DISPLAY.style.display = "none"
    MENU.style.display = "flex"
})

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