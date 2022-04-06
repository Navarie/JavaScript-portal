let listCounter = 0
let toDoLists = []
let toDoListNames = []
getLocalStorage()

    // ===================== MENU EVENTS ==============================
document.getElementsByClassName("addListButton")[0].addEventListener("click", () => createToDoList())
document.getElementsByClassName("resetButton")[0].addEventListener("click", () => {
    localStorage.clear()
    setTimeout(() => location.reload(), 1337 + 420 + 69)
    console.log(">> All to-do lists are gone. Ahh, that's better!" +
        "\n>> Refreshing...")
})

function createToDoList() {
    const rubric = document.createElement("rubric")
    const listIdentifier = setupContainer(rubric)
    const input = document.getElementById("menu-input").value

    insertTitle(input)
    setupMinimiseButton(input)
    addListToArray(listIdentifier, input, true)

    listCounter++
    console.log(">> New to-do list added: " + input)
    document.getElementById("menu-header").value = ""
    document.getElementById("placeholder-title").setAttribute("id", "throwaway")
}

function setupContainer(rubric, listIdentifier) {
    let listID
    if (listCounter % 2 === 0) {
        const leftColumn = document.querySelector(".leftColumn")
        leftColumn.appendChild(rubric)
        listID = appendListTemplate(rubric, listIdentifier)
    } else {
        const rightColumn = document.querySelector(".rightColumn")
        rightColumn.appendChild(rubric)
        listID = appendListTemplate(rubric, listIdentifier)
    }
    return listID
}

function appendListTemplate(element, listIdentifier) {
    let uniqueId
    const temp = document.getElementsByTagName("template")[0]
    const clone = temp.content.cloneNode(true)
    element.appendChild(clone)

        // Handle unique identification.
    if (listIdentifier == null) {
        uniqueId = createIdentifier()
    } else {
        uniqueId = listIdentifier
    }

    const todoListElement = document.getElementById("list-header")
    todoListElement.setAttribute("data-key", uniqueId)
    todoListElement.setAttribute("listCounter", listCounter.toString())

        // Third element is moveToButton.
    const moveButton = todoListElement.firstElementChild.nextElementSibling.nextElementSibling
    const headerListCounter = todoListElement.getAttribute("listCounter")
    addMoveListener(moveButton, headerListCounter)

        // Last element is addEntryButton.
    todoListElement.lastElementChild.addEventListener("click", (ev) => retrieveDataKey(ev))
    todoListElement.setAttribute("id", "throwaway")

    document.getElementById("list-unsorted-list").setAttribute("data-key", uniqueId)
    document.getElementById("list-unsorted-list").setAttribute("id", "insertReady")

    document.getElementById("list-input").setAttribute("data-key", uniqueId)
    document.getElementById("list-input").setAttribute("id", "throwaway")

    return uniqueId
}

function retrieveDataKey(ev) {
    const dataKey = ev.target.parentElement.getAttribute("data-key")
    const listNumber = ev.target.parentElement.getAttribute("listCounter")

    newEntry(dataKey, listNumber)
}

function newEntry(dataKey, listNumber) {
    const unsortedListElements = document.querySelectorAll("ul[data-key]")
    const inputElements = document.querySelectorAll("input[data-key]")
    const div = findElementByKey(dataKey, unsortedListElements)
    const input = findElementByKey(dataKey, inputElements)

    const li = document.createElement("li")
    const text = document.createTextNode(input.value)
    li.appendChild(text)

    appendDeleteButton(li)
    appendMoveButton(li)
    handleListMouseEvents(li)
    div.appendChild(li)
    addToDoItem(listNumber, input.value, false)
    console.log(">> New entry added: " + input.value)
    input.value = ""
}

    // ==================== EVENT HANDLING ============================
function handleContainerMouseEvents(containerElement, titleInput) {
    containerElement.addEventListener("click", function (event) {
        if (event.target.classList.value === "maximiseButton") {
            maximiseContainer(event.target)
            event.target.style.display = "none"
        }
        if (event.target.classList.value === "minimiseButton") {
            minimiseContainer(event.target.parentElement, titleInput)
        }
    }, false)
}

function handleListMouseEvents(listElement) {
    listElement.addEventListener("click", (event) => {
        if (event.target.tagName === "LI") {
            const counter = event.target.parentElement.previousElementSibling.getAttribute("listCounter")
                // Get name of task and remove the last 6 characters.
            const name = event.target.textContent.slice(0, -6)

            event.target.classList.toggle("checked")
            if (event.target.classList.contains("checked")) {
                console.log(">> Task completed. Whew!")
            }
            toggleComplete(counter, name)
        }

        if (event.target.classList.value === "deletion" || event.target.classList.value === "moveButton") {
            removeFromList(event.target)
        }
    }, false)
}

function addMoveListener(moveToButtonElement, headerListCounter) {
    moveToButtonElement.addEventListener("click", () => {
        addToDoItem(headerListCounter, storedName, false)
        renderList(headerListCounter, storedName, false)
        deleteToDoItem(storedCounter, storedName)
        hideMoveToButtons()
    }, {once: true})
}


    // ====================== RENDERING ================================
function renderContainer(listIdentifier, listName, listVisible) {
    const rubric = document.createElement("rubric")

    setupContainer(rubric, listIdentifier)
    insertTitle(listName)
    setupMinimiseButton(listName)

    if (!listVisible) {
        createMaximiseButton(listName)
        rubric.style.display = "none"
    }
    document.getElementById("placeholder-title").setAttribute("id", "throwaway")
}

function renderList(listCount, toDoItem, completed) {
    const headerElements = document.querySelectorAll(".listHeader[listcounter]")

    for (let i = 0; i < headerElements.length; i++) {
        const headerListCounter = headerElements[i].getAttribute("listCounter")

        if (headerListCounter === listCount) {
            const div = headerElements[i].nextElementSibling
            const li = document.createElement("li")
            const text = document.createTextNode(toDoItem)
            li.appendChild(text)
            appendDeleteButton(li)
            appendMoveButton(li)

            if (completed) li.className = "checked"

            handleListMouseEvents(li)
            div.appendChild(li)
        }
    }
}

function minimiseContainer(containerElement, titleInput) {
    containerElement.style.display = "none"
    containerElement.nextElementSibling.style.display = "none"

    createMaximiseButton(titleInput)
    toggleVisibility(titleInput)
}

function maximiseContainer(containerElement) {
        // Remove "Show: " from the element's string.
    const titleInput = containerElement.textContent.substring(6)
    toggleVisibility(titleInput)
}

    // =================== HELPER FUNCTIONS ============================
function createIdentifier() {
    const uniqueId = () => {
        const dateString = Date.now().toString(36)
        const randomness = Math.random().toString(36).substring(0, 2)
        return dateString + randomness
    }

    return uniqueId()
}

function findElementByKey(elementKey, elementList) {
    for (let i = 0; i < elementList.length; i++) {
        if (elementList[i].getAttribute("data-key") === elementKey) {
            return elementList[i]
        }
    }
}

function insertTitle(input) {
    const placeholderTitle = document.getElementById("placeholder-title")
    const text = document.createTextNode(input)
    placeholderTitle.appendChild(text)
}

function removeFromList(eventTarget) {
    const counter = eventTarget.parentElement.parentElement.previousElementSibling.getAttribute("listCounter")
    const name = eventTarget.parentElement.textContent.slice(0, -6)
    eventTarget.parentElement.style.display = "none"
    deleteToDoItem(counter, name)
    console.log(">> Deleted entry: " + name)

    if (eventTarget.classList.value === "moveButton") {
        showMoveToButtons(counter)
        console.log(">> Moving item " + name + "...")
        storeInformationForMove(counter, name)
    }
}

let storedCounter
let storedName
function storeInformationForMove(counter, name) {
    storedCounter = counter
    storedName = name
}

    // ================== LOCAL STORAGE & ARRAYS =======================
function addListToArray(listIdentifier, toDoListName, boolean) {
    const toDoList = []
    const toDoListNameArray = {listName: toDoListName, dataKey: listIdentifier, visible: boolean}

    toDoLists.push(toDoList)
    toDoListNames.push(toDoListNameArray)
    localStorage.setItem("toDoListNames", JSON.stringify(toDoListNames))
}

function addToDoItem(listCount, toDoItem, boolean) {
    const toDo = {counter: listCount, taskName: toDoItem, completed: boolean}

    toDoLists[listCount].push(toDo)
    localStorage.setItem("toDoLists", JSON.stringify(toDoLists))
}

function toggleVisibility(name) {
    const listNameStorage = localStorage.getItem("toDoListNames")
    const retrievedListNameStorage = JSON.parse(listNameStorage)

    retrievedListNameStorage.forEach((item) => {
        if (item.listName === name) {
            if (!item.visible) {
                renderContainer(item.dataKey, name, true)
                location.reload()
            }
            item.visible = !item.visible
        }
    })
    localStorage.setItem("toDoListNames", JSON.stringify(retrievedListNameStorage))
}

function toggleComplete(counter, name) {
    const taskStorage = localStorage.getItem("toDoLists")
    const retrievedTaskStorage = JSON.parse(taskStorage)

    retrievedTaskStorage.forEach((item) => {
        for (let i = 0; i < item.length; i++) {
            if (item[i].counter === counter && item[i].taskName === name) {
                item[i].completed = !item[i].completed
            }
        }
    })
    localStorage.setItem("toDoLists", JSON.stringify(retrievedTaskStorage))
}

function deleteToDoItem(counter, name) {
    const taskStorage = localStorage.getItem("toDoLists")
    const retrievedTaskStorage = JSON.parse(taskStorage)

    retrievedTaskStorage[counter].forEach(() => {
        retrievedTaskStorage[counter] = retrievedTaskStorage[counter].filter(item => item.taskName !== name)
    })
    localStorage.setItem("toDoLists", JSON.stringify(retrievedTaskStorage))
}

function getLocalStorage() {
    const storage = localStorage.getItem("toDoLists")
    const listNameStorage = localStorage.getItem("toDoListNames")
    const retrievedStorage = JSON.parse(storage)
    const retrievedListNameStorage = JSON.parse(listNameStorage)

    localStorage.setItem("toDoLists", JSON.stringify(retrievedStorage))
    localStorage.setItem("toDoListNames", JSON.stringify(retrievedListNameStorage))

    if (retrievedListNameStorage != null) {
        console.log("Lists array...")
        console.table(retrievedListNameStorage, ["listName", "visible"])

        retrievedListNameStorage.forEach((item) => {
            addListToArray(item.dataKey, item.listName, item.visible)
            renderContainer(item.dataKey, item.listName, item.visible)
            listCounter++
        })
    }
    if (retrievedStorage != null) {
        console.log("Tasks array...")
        for (let i = 0; i < retrievedStorage.length; i++) {
            console.table((retrievedStorage)[i], ["counter", "taskName", "completed"])
        }
        retrievedStorage.forEach((item) => {
            for (let i = 0; i < item.length; i++) {
                addToDoItem(item[i].counter, item[i].taskName, item[i].completed)
                renderList(item[i].counter, item[i].taskName, item[i].completed)
            }
        })
    }
}

    // ==================== BUTTON FUNCTIONS ===========================
function showMoveToButtons(counter) {
    const headerElements = document.querySelectorAll(".listHeader[listcounter]")

    let moveToButtonElement
    for (let i = 0; i < headerElements.length; i++) {
        const headerListCounter = headerElements[i].getAttribute("listCounter")
        moveToButtonElement = headerElements[i].firstElementChild.nextElementSibling.nextElementSibling

        if (headerListCounter !== counter) {
            moveToButtonElement.style.visibility = "visible"
        }
    }
}

function hideMoveToButtons() {
    const headerElements = document.querySelectorAll(".listHeader[listcounter]")

    let moveToButtonElement
    for (let i = 0; i < headerElements.length; i++) {
        moveToButtonElement = headerElements[i].firstElementChild.nextElementSibling.nextElementSibling
        moveToButtonElement.style.visibility = "hidden"
    }
}

function appendDeleteButton(element) {
    const span = document.createElement("span")
    const deleteMark = document.createTextNode("x")
    span.className = "deletion"
    span.appendChild(deleteMark)
    element.appendChild(span)
}

function appendMoveButton(element) {
    const span = document.createElement("span");
    const moveText = document.createTextNode(">Move")
    span.className = "moveButton"
    span.appendChild(moveText)
    element.appendChild(span)
}

function setupMinimiseButton(titleInput) {
    const minimiseButton = document.getElementById("placeholder-minimise");
    handleContainerMouseEvents(minimiseButton, titleInput)
    minimiseButton.setAttribute("id", "throwaway")
}

function createMaximiseButton(listName) {
    const titleTextNode = document.createTextNode("Show: " + listName)
    const listInputField = document.getElementById("menu-header")
    const maximiseButton = document.createElement("div")

    maximiseButton.appendChild(titleTextNode)
    maximiseButton.className = "maximiseButton"
    listInputField.appendChild(maximiseButton)
    handleContainerMouseEvents(maximiseButton)
}