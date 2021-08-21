import { createStore } from "redux"

let recordState
//初始化state
const initialState = [
  {
    bookId: 0,
    bookName: "<<Test book>>",
  },
]
//创造规则需要，初始化state，action是新来的action，state永远都是上一个state，没有的话就是初始化state
const reducer = function (state = initialState, action) {
  recordState = state
  switch (action.type) {
    case "addBook":
      //会改变state,不能直接更改state，需要创建新state
      return [
        ...state,
        {
          bookId: action.info.bookId,
          bookName: action.info.bookName,
        },
      ]
    case "delBook":
      return state.filter((book) => book.bookId != action.info.bookId) //能确定的是能保留得
    default:
      return [...state]
  }
}
//创造store需要规则
const store = createStore(reducer)

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

//自动累加book id
function* generateID() {
  let id = 1
  while (true) {
    yield id++
  }
}
const generateId = generateID()
const genBookId = () => generateId.next().value

function addBookFn() {
  const bookName = bookNameInput.value
  if (bookName) {
    console.log("ADD BOOK")
    const bookId = genBookId()
    bookNameInput.value = ""

    //创造action
    const action = {
      type: "addBook",
      info: {
        bookId: bookId,
        bookName: bookName,
      },
    }
    //发送action
    store.dispatch(action)
  } else {
    //加入bookname为空
    console.log("need input book name")
  }
}

function delBookFn() {
  console.log("DEL BOOK")
  const bookId = bookIdInput.value
  if (bookId) {
    bookIdInput.value = ""
    const action = {
      type: "delBook",
      info: {
        bookId: bookId,
      },
    }
    store.dispatch(action)
  } else {
    //删除bookname为空
    console.log("need input book id")
  }
}

//订阅state变化
const showState = store.subscribe(() => {
  console.log("old state:", recordState) //老的state
  console.log("new state:", store.getState()) //新的state
})

const showNewList = store.subscribe(() => {
  const currentState = store.getState() //改变时，拿到state
  if (currentState.length !== recordState.length) {
    bookList.innerText = "" //去除老列表
    //把新元素重新往里写
    currentState.forEach((element) => {
      bookList.appendChild(createBookList(element))
    })
  }
})

function createBookList(info) {
  const element = document.createElement("li")
  element.innerText = info.bookName
  return element
}
