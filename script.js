// Define DOM elements to manipulate webpage
const bookcase = document.querySelector("div.bookcase");
const buttonAdd = document.querySelector("#buttonAddBooks");
const modal = document.querySelector("div.modal");
const closeBtn = document.querySelector("span.close");
const submitBookBtn = document.querySelector("#submitBook");

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  read() {
    return `${title} by ${author},  ${pages}, ${read}`
  }
}

submitBookBtn.addEventListener("click", () => {
  addBookToLibrary();
  modal.style.display = "none";
  document.getElementById("newBookForm").reset();
});

// Event listeners for displaying modal
buttonAdd.addEventListener("click", () => {
  modal.style.display = "block";
  //give focus to first input of modal
  document.getElementById("title").focus();
});
closeBtn.addEventListener("click", () => modal.style.display = "none");

// close modal when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// default books to put in library
const book1 = new Book("Harry Potter", "J.K. Rowling", "233", "true");
const book2 = new Book("The Principles of Object-Oriented JavaScript", "Nicolas C. Zakas", 122, "false");

// array that contains all books
let myLibrary = [
  book1,
  book2
];

// Fill bookcase with books that are already in bookcase
populateBookcase();

// function to add new books to library
function addBookToLibrary() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readState = document.querySelector('input[name="readstatus"]:checked').value;
  
  // Create new book based on inputs
  const book = new Book(title, author, pages, readState);
  // Add new book to the end of the library array
  myLibrary.push(book);
  // Add first book to page
  writeBookToPage(book, myLibrary.length-1);
}

// display all books in library array on page
function populateBookcase() {
  for (book in myLibrary) {
    //add dataset attribute with value book
    let bookNmb = book;
    // also pass this value to next function call
    writeBookToPage(myLibrary[book], book);
  }
}

// helper function to create DOM elements out of book-object
function writeBookToPage(book, place) {
  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
  bookElement.dataset.place = place;
  // store all attributes for book in separate elements
  const title = document.createElement("h2");
  title.innerText = `${book.title}`;
  const byLine = document.createElement("p");
  byLine.innerText = "by";
  const author = document.createElement("h3");
  author.innerText = `${book.author}`;
  const pages = document.createElement("p");
  pages.innerText = `${book.pages} pages`;
  const readStatus = document.createElement("p");
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove book";
  removeBtn.classList.add = "remove";
  
  // functionality for button to remove specific book
  removeBtn.addEventListener("click", removeBook);
  const checkbox = createReadCheckbox(book);

  // append those elements as child to div
  bookElement.appendChild(checkbox);
  bookElement.appendChild(title);
  bookElement.appendChild(byLine);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(readStatus);
  bookElement.appendChild(removeBtn);

  // Add book to bookcase after buttonAdd, but before any existing books
  bookcase.appendChild(bookElement);
}

// function to return the correct checkbox, gets passed a book obj)
function createReadCheckbox(book) {
  // create a container div for the checkmark
  const container = document.createElement("div");
  container.classList.add("checkmark-container");
  // create a div for the checkmark
  const checkmark = document.createElement("div");
  checkmark.classList.add("checkmark");
  // check for this.read boolean
  if (book.read == "true") {
    checkmark.classList.add("read");
  } else {
    checkmark.classList.add("not-read");
  }
  // add click function to toggle read state
  container.addEventListener("click", toggleRead);
  // add checkmark as child element of container div
  container.appendChild(checkmark);
  // add container div to webpage
  return container;
}

function toggleRead(event) {
  // check which book to flip read state
  const target = event.target.closest("div.book");
  // read array index of target
  const index = target.dataset.place;
  // store checkmark in variable
  const checkmark = event.target.closest("div.checkmark");
  // change state in array and on page
  if (myLibrary[index].read == "true") {
    // toggle value of target book in array at index
    myLibrary[index].read = "false";
    // change class in DOM
    checkmark.classList.remove("read");
    checkmark.classList.add("not-read");
  } else {
    // toggle value of target book in array at index
    myLibrary[index].read = "true";
    // change class in DOM
    checkmark.classList.remove("not-read");
    checkmark.classList.add("read");
  }
}

function removeAllBooks() {
  while (bookcase.children[1]) {
    bookcase.removeChild(bookcase.children[1]);
  }
}

function removeBook(event) {
  // get data-place of book where button was clicked
  let target = event.target.closest("div.book");
  // remove book from array
  myLibrary.splice(target.dataset.place, 1);
  //empty out the library and put new array on page
  removeAllBooks();
  populateBookcase();
}