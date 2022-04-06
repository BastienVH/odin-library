const book1 = new Book("Harry Potter", "J.K. Rowling", "233", true);
const book2 = new Book("The Principles of Object-Oriented JavaScript", "Nicolas C. Zakas", 122, false);

let myLibrary = [
  book1,
  book2
];

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
