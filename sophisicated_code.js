/* sophisicated_code.js */
/* This code demonstrates a complex system for managing a library of books. It includes various classes for storing book information, handling borrowing and returning books, and generating reports. */

class Book {
  constructor(title, author, genre, ISBN) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.ISBN = ISBN;
    this.isAvailable = true;
    this.borrower = null;
  }

  borrowBook(borrower) {
    if (this.isAvailable) {
      this.isAvailable = false;
      this.borrower = borrower;
    } else {
      console.log("The book is already borrowed by someone else.");
    }
  }

  returnBook() {
    if (!this.isAvailable) {
      this.isAvailable = true;
      this.borrower = null;
    } else {
      console.log("The book is already available.");
    }
  }
}

class Library {
  constructor(name) {
    this.name = name;
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(book) {
    const index = this.books.indexOf(book);
    if (index > -1) {
      this.books.splice(index, 1);
    }
  }

  searchByTitle(title) {
    return this.books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));
  }

  searchByAuthor(author) {
    return this.books.filter(book => book.author.toLowerCase().includes(author.toLowerCase()));
  }

  searchByGenre(genre) {
    return this.books.filter(book => book.genre.toLowerCase().includes(genre.toLowerCase()));
  }

  generateAvailableBooksReport() {
    const availableBooks = this.books.filter(book => book.isAvailable);
    console.log("Available Books Report");
    console.log("----------------------");
    availableBooks.forEach(book => {
      console.log(`Title: ${book.title}`);
      console.log(`Author: ${book.author}`);
      console.log(`ISBN: ${book.ISBN}`);
      console.log("----------------------");
    });
  }
}

class Borrower {
  constructor(name) {
    this.name = name;
  }

  borrowBook(library, bookTitle) {
    const books = library.searchByTitle(bookTitle);
    const availableBooks = books.filter(book => book.isAvailable);

    if (availableBooks.length > 0) {
      const book = availableBooks[0];
      book.borrowBook(this);
      console.log(`${this.name} borrowed the book "${book.title}".`);
    } else {
      console.log(`No available books with the title "${bookTitle}" found.`);
    }
  }

  returnBook(library, bookTitle) {
    const books = library.searchByTitle(bookTitle);
    const borrowedBooks = books.filter(book => !book.isAvailable && book.borrower === this);

    if (borrowedBooks.length > 0) {
      const book = borrowedBooks[0];
      book.returnBook();
      console.log(`${this.name} returned the book "${book.title}".`);
    } else {
      console.log(`No borrowed books with the title "${bookTitle}" found for ${this.name}.`);
    }
  }
}

// Usage example:

const library = new Library("My Library");

const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", "Classic", "978-0743273565");
const book2 = new Book("To Kill a Mockingbird", "Harper Lee", "Classic", "978-0446310789");
const book3 = new Book("1984", "George Orwell", "Dystopian", "978-0451524935");

library.addBook(book1);
library.addBook(book2);
library.addBook(book3);

const borrower1 = new Borrower("John");
const borrower2 = new Borrower("Alice");

borrower1.borrowBook(library, "The Great Gatsby");
borrower1.borrowBook(library, "1984");
borrower2.borrowBook(library, "The Great Gatsby");

borrower1.returnBook(library, "The Great Gatsby");
borrower2.returnBook(library, "The Great Gatsby");

library.generateAvailableBooksReport();