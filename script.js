// Define DOM elements to manipulate webpage
const bookcase = document.querySelector("div.bookcase");
const buttonAdd = document.querySelector("#buttonAddBooks");
const modal = document.querySelector("div.modal");
const closeBtn = document.querySelector("span.close");
const submitBookBtn = document.querySelector("#submitBook");

submitBookBtn.addEventListener("click", () => {
  addBookToLibrary();
  modal.style.display = "none";
  document.getElementById("newBookForm").reset();
});

// Event listeners for displaying modal
buttonAdd.addEventListener("click", () => modal.style.display = "block");
closeBtn.addEventListener("click", () => modal.style.display = "none");

// close modal when clicking outside modal
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// functionality for button to remove specific book
// target bookcase
bookcase.addEventListener("click", (e) => {
  // get data-place of book where button was clicked
  let target = event.target.closest("div.book");
  // remove book from array
  myLibrary.splice(target.dataset.place, 1);
  // redraw book library
  populateBookcase();
});

// default books to put in library
const book1 = new Book("Harry Potter", "J.K. Rowling", "233", true);
const book2 = new Book("The Principles of Object-Oriented JavaScript", "Nicolas C. Zakas", 122, false);

// array that contains all books
let myLibrary = [
  book1,
  book2
];

// Fill bookcase with books that are already in bookcase
populateBookcase();

// object constructor for new books
function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

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
  if (book.read) {
    readStatus.innerText = "Read book"
  } else {
    readStatus.innerText = "Not read yet" 
  }
  const removeBtn = document.createElement("button");
  removeBtn.innerText = "Remove book";
  removeBtn.classList.add = "remove";
  // append those elements as child to div
  bookElement.appendChild(title);
  bookElement.appendChild(byLine);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(readStatus);
  bookElement.appendChild(removeBtn);

  // Add book to bookcase after buttonAdd, but before any existing books
  bookcase.appendChild(bookElement);
}