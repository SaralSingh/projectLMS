// JavaScript functions for managing books, users, and borrowing books.
let books = [];
let users = [];
let borrowedBooks = [];

function addBook() {
    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;

    // Check if either the title or author is empty.
    if (title.trim() === '' || author.trim() === '') {
        alert('Please enter both title and author.');
        return;
    }

    const book = { title, author };

    books.push(book);

    // Clear the input fields.
    document.getElementById('bookTitle').value = '';
    document.getElementById('bookAuthor').value = '';

    displayBooks();
}


function displayBooks() {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Book ${index}: Title: ${book.title}, Author: ${book.author}`;
        bookList.appendChild(listItem);
    });
}

function addUser() {
    const name = document.getElementById('userName').value;

    // Check if the user name is not empty.
    if (name.trim() === '') {
        alert('Please enter a user name.');
        return;
    }

    const user = { name };

    users.push(user);

    // Clear the input field.
    document.getElementById('userName').value = '';

    displayUsers();
}

function displayUsers() {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';

    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `User ${index}: Name: ${user.name}`;
        userList.appendChild(listItem);
    });
}

function borrowBook() {
    const userId = document.getElementById('userID').value;
    const bookId = document.getElementById('bookID').value;

    // Check if the user and book IDs are valid (e.g., within array bounds).
    if (userId < 0 || userId >= users.length || bookId < 0 || bookId >= books.length) {
        alert('Invalid user or book ID. Please check your input.');
        return;
    }

    // Add the book to the borrowedBooks array.
    borrowedBooks.push({ userId, bookId });

    // Clear the input fields.
    document.getElementById('userID').value = '';
    document.getElementById('bookID').value = '';

    // Update the display or perform additional actions (e.g., updating borrowed book list).
    displayBorrowedBooks();
}


function displayBorrowedBooks() {
    const borrowedBooksList = document.getElementById('borrowedBooksList');
    borrowedBooksList.innerHTML = '';

    borrowedBooks.forEach((borrowing, index) => {
        const user = users[borrowing.userId];
        const book = books[borrowing.bookId];

        const listItem = document.createElement('li');
        listItem.textContent = `Borrowing ${book.title} by ${book.author} - Borrowed by ${user.name}`;
        borrowedBooksList.appendChild(listItem);
    });
}

function returnBook() {
    const userId = document.getElementById('userID').value;
    const bookId = document.getElementById('bookID').value;

    // Check if the user and book IDs are valid (e.g., within array bounds).
    if (userId < 0 || userId >= users.length || bookId < 0 || bookId >= books.length) {
        alert('Invalid user or book ID. Please check your input.');
        return;
    }

    // Check if the user has borrowed the specified book.
    const borrowedBookIndex = borrowedBooks.findIndex((borrowing) => borrowing.userId == userId && borrowing.bookId == bookId);
    if (borrowedBookIndex === -1) {
        alert('This book has not been borrowed by the specified user.');
        return;
    }

    // Remove the book from the borrowedBooks array.
    borrowedBooks.splice(borrowedBookIndex, 1);

    // Clear the input fields.
    document.getElementById('userID').value = '';
    document.getElementById('bookID').value = '';

    // Update the display or perform additional actions (e.g., updating borrowed book list).
    displayBorrowedBooks();
}

