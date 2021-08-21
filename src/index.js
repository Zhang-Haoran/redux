const root = document.getElementById("app")
const addBook = document.getElementById("addBook")
const delBook = document.getElementById("delBook")
const bookList = document.getElementById("bookList")

const addBookBtn = document.createElement("button")
const bookNameInput = document.createElement("input")
const delBookBtn = document.createElement("button")
const bookIdInput = document.createElement("input")

addBookBtn.innerText = "ADD BOOK"
delBookBtn.innerText = "DEL BOOK"

addBookBtn.addEventListener("click", addBookFn)
delBookBtn.addEventListener("click", delBookFn)

addBook.appendChild(bookNameInput)
addBook.appendChild(addBookBtn)
delBook.appendChild(bookIdInput)
delBook.appendChild(delBookBtn)

function addBookFn() {
  console.log("ADD BOOK")
}

function delBookFn() {
  console.log("DEL BOOK")
}
