// Define DOM elements to manipulate webpage
const bookcase = document.querySelector("div.bookcase");

const book1 = new Book("Harry Potter", "J.K. Rowling", "233", true);
const book2 = new Book("The Principles of Object-Oriented JavaScript", "Nicolas C. Zakas", 122, false);

let myLibrary = [
  book1,
  book2
];

// Fill bookcase with books that are already in bookcase
populateBookcase();

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`
  }
}

function addBookToLibrary() {
  const title = prompt("What is the title of the book?", "title");
  const author = prompt("Who is the author of the book?", "author");
  const pages = prompt("How many pages are in the book?", "# of pages");
  const read = prompt("Have you read the book?", "true/false");
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}


function populateBookcase() {
  for (book in myLibrary) {
    writeBookToPage(myLibrary[book]);
  }
}

function writeBookToPage(book) {
  let bookElement = document.createElement("div");
  bookElement.classList.add("book");
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
  // append those elements as child to div
  bookElement.appendChild(title);
  bookElement.appendChild(byLine);
  bookElement.appendChild(author);
  bookElement.appendChild(pages);
  bookElement.appendChild(readStatus);

  // append completed book to bookcase
  bookcase.appendChild(bookElement);
}