document.addEventListener("DOMContentLoaded", () => {
  getData();
  generateBooks(books);
});
const checkbox = document.querySelector("#isComplete");
checkbox.addEventListener("change", (e) => {
  if (!e.target.classList.contains("appear")) {
    e.target.classList.add("appear");
  } else {
    e.target.classList.remove("appear");
  }
});
const books = [];
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const year = document.querySelector("#year").value;
  const isComplete = document.querySelector("#isComplete").checked;
  const id = generatedId();
  const book = {
    id,
    title,
    author,
    year,
    isComplete,
  };
  books.push(book);
  saveData();
  generateBooks();
});
const generatedId = () => {
  return +new Date();
};

const generateBooks = () => {
  const incompleteContainer = document.querySelector(".book-container");
  const completeContainer = document.querySelector(".finished-book-container");

  const incompleteBooks = books.filter((book) => !book.isComplete);
  const htmlIncompleteBooks = filterIncompleteBooks(incompleteBooks);
  incompleteContainer.innerHTML = htmlIncompleteBooks;

  const completeBooks = books.filter((book) => book.isComplete);
  const htmlCompleteBooks = filterCompleteBooks(completeBooks);
  completeContainer.innerHTML = htmlCompleteBooks;
};

const filterIncompleteBooks = (books) => {
  let result = "";
  books.map((book) => {
    result += `
    <div class="book">
        <h4>${book.title}</h4>
        <span>${book.author}</span>
        <span>${book.year}</span>
        <button class="to-finished" onclick=toFinished(${book.id})  >Move to Finished Reading</button>
        <button class="remove" onclick=remove(${book.id}) >Remove</button>
    </div>
    `;
  });
  return result;
};
const filterCompleteBooks = (books) => {
  result = "";
  books.map((book) => {
    result += `
    <div class="book">
        <h4>${book.title}</h4>
        <span>${book.author}</span>
        <span>${book.year}</span>
        <button class="to-notfinished" onclick=toNotFinished(${book.id})>Move to Not Finished Reading</button>
        <button class="remove" onclick=remove(${book.id})>Remove</button>
    </div>
    `;
  });
  return result;
};

const toFinished = (bookId) => {
  books.forEach((book) => {
    if (book.id === bookId) {
      book.isComplete = true;
    }
  });
  saveData();
  generateBooks();
};
const toNotFinished = (bookId) => {
  books.forEach((book) => {
    if (book.id === bookId) {
      book.isComplete = false;
    }
  });
  saveData();
  generateBooks();
};

const remove = (idBook) => {
  const customDialog = document.querySelector("aside");
  customDialog.style.display = "inherit";

  const confirmDelete = document.querySelector(".confirm-delete");
  const confirmCancel = document.querySelector(".confirm-cancel");

  confirmDelete.addEventListener("click", () => {
    const getBookIndex = books.findIndex((book) => {
      return book.id === idBook;
    });
    if (getBookIndex !== -1) {
      books.splice(getBookIndex, 1);
      saveData();
      generateBooks();
      customDialog.style.display = "none";
    }
  });

  confirmCancel.addEventListener("click", () => {
    customDialog.style.display = "none";
  });
};

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
  const searchTitle = document.querySelector(".title-search").value;
  if (searchTitle == "") {
    generateBooks();
  } else {
    const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(searchTitle.toLowerCase()));
    generateFilteredBooks(filteredBooks);
  }
});
const generateFilteredBooks = (filteredBooks) => {
  const incompleteContainer = document.querySelector(".book-container");
  const completeContainer = document.querySelector(".finished-book-container");

  const incompleteBooks = filteredBooks.filter((book) => !book.isComplete);
  const htmlIncompleteBooks = filterIncompleteBooks(incompleteBooks);
  incompleteContainer.innerHTML = htmlIncompleteBooks;

  const completeBooks = filteredBooks.filter((book) => book.isComplete);
  const htmlCompleteBooks = filterCompleteBooks(completeBooks);
  completeContainer.innerHTML = htmlCompleteBooks;
};

const saveData = () => {
  const parsingBooks = JSON.stringify(books);
  console.log(parsingBooks);
  localStorage.setItem("data", parsingBooks);
};

const getData = () => {
  const data = localStorage.getItem("data");
  const dataParse = JSON.parse(data);
  if (dataParse !== null) {
    dataParse.forEach((data) => books.push(data));
  }
};
