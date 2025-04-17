const API_BASE = "http://localhost:5000/api";

function loadContent(section, el) {
  const content = document.getElementById("main-content");

  document
    .querySelectorAll(".sidebar .nav-item")
    .forEach((item) => item.classList.remove("active"));
  if (el) {
    el.classList.add("active");
  }

  fetch(`./partials/${section}.html`)
    .then((response) => response.text())
    .then((html) => {
      content.innerHTML = html;

      if (section === "books") {
        loadBooks();
        loadBookCategories();
        document
          .getElementById("book-category-filter")
          .addEventListener("change", function () {
            const selectedCategory = this.value;
            if (selectedCategory) {
              loadBooksByCategory(selectedCategory);
            } else {
              loadBooks();
            }
          });

        document
          .getElementById("search-books-input")
          .addEventListener("input", function () {
            const query = this.value.trim();
            if (query) {
              searchBooks(query);
            } else {
              loadBooks();
            }
          });
      }
    })
    .catch((err) => {
      content.innerHTML = `<h2>Error loading content</h2>`;
      console.error("Error loading content:", err);
    });
}

function loadBooks() {
  fetch(`${API_BASE}/books`)
    .then((res) => res.json())
    .then((books) => {
      const tbody = document.getElementById("book-table-body");
      const bookListContainer = document.getElementById("book-list-container");
      const emptyBookContainer = document.getElementById(
        "empty-book-container"
      );

      tbody.innerHTML = "";
      if (books.length === 0) {
        bookListContainer.style.display = "none";
        emptyBookContainer.style.display = "block";
        return;
      }

      bookListContainer.style.display = "block";
      emptyBookContainer.style.display = "none";

      books.forEach((book, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.publisher}</td>
          <td>${book.category?.[0]?.categoryName || "-"}</td>
          <td>${
            book.published ? new Date(book.published).toLocaleDateString() : "-"
          }</td>
          <td>
            <button class="btn btn-sm btn-warning text-white me-2" onclick='openBookModal(${JSON.stringify(
              book
            )})'>Edit</button>
            <button class="btn btn-sm btn-danger" onclick='deleteBook("${
              book._id
            }")'>Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Error fetching books:", err);
    });
}

window.deleteBook = (id) => {
  const modal = new bootstrap.Modal(
    document.getElementById("deleteConfirmModal")
  );
  modal.show();

  document
    .getElementById("confirmDeleteBtn")
    .addEventListener("click", function () {
      fetch(`${API_BASE}/books/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          modal.hide();
          loadContent("books");
        })
        .catch((err) => console.error("Error deleting book:", err));
    });
};

function loadBookCategories(selectedId = "") {
  fetch(`${API_BASE}/bookcategories`)
    .then((res) => res.json())
    .then((categories) => {
      const categorySelect = document.getElementById("book-category");
      const bookCategoryFilter = document.getElementById(
        "book-category-filter"
      );

      categorySelect.innerHTML =
        '<option value="">-- Select Category --</option>';
      bookCategoryFilter.innerHTML =
        '<option value="">-- All Categories --</option>';

      categories.forEach((cat) => {
        const isSelected = cat._id === selectedId ? "selected" : "";
        categorySelect.innerHTML += `<option value="${cat._id}" ${isSelected}>${cat.categoryName}</option>`;
        bookCategoryFilter.innerHTML += `<option value="${cat._id}">${cat.categoryName}</option>`;
      });
    })
    .catch((err) => {
      console.error("Error fetching categories:", err);
    });
}

function loadBooksByCategory(categoryId) {
  fetch(`${API_BASE}/books/category/${categoryId}`)
    .then((res) => res.json())
    .then((books) => {
      const tbody = document.getElementById("book-table-body");
      const bookListContainer = document.getElementById("book-list-container");
      const emptyBookContainer = document.getElementById(
        "empty-book-container"
      );

      tbody.innerHTML = "";
      if (books.length === 0) {
        bookListContainer.style.display = "none";
        emptyBookContainer.style.display = "block";
        return;
      }

      bookListContainer.style.display = "block";
      emptyBookContainer.style.display = "none";

      books.forEach((book, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.publisher}</td>
          <td>${book.category?.[0]?.categoryName || "-"}</td>
          <td>${
            book.published ? new Date(book.published).toLocaleDateString() : "-"
          }</td>
          <td>
            <button class="btn btn-sm btn-warning text-white me-2" onclick='openBookModal(${JSON.stringify(
              book
            )})'>Edit</button>
            <button class="btn btn-sm btn-danger" onclick='deleteBook("${
              book._id
            }")'>Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Error fetching books by category:", err);
    });
}

function searchBooks(query) {
  fetch(`${API_BASE}/books/search?query=${query}`)
    .then((res) => res.json())
    .then((books) => {
      const tbody = document.getElementById("book-table-body");
      const bookListContainer = document.getElementById("book-list-container");
      const emptyBookContainer = document.getElementById(
        "empty-book-container"
      );

      tbody.innerHTML = "";
      if (books.length === 0) {
        bookListContainer.style.display = "none";
        emptyBookContainer.style.display = "block";
        return;
      }

      bookListContainer.style.display = "block";
      emptyBookContainer.style.display = "none";

      books.forEach((book, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.publisher}</td>
          <td>${book.category?.[0]?.categoryName || "-"}</td>
          <td>${
            book.published ? new Date(book.published).toLocaleDateString() : "-"
          }</td>
          <td>
            <button class="btn btn-sm btn-warning text-white me-2" onclick='openBookModal(${JSON.stringify(
              book
            )})'>Edit</button>
            <button class="btn btn-sm btn-danger" onclick='deleteBook("${
              book._id
            }")'>Delete</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch((err) => {
      console.error("Error searching books:", err);
    });
}

window.openBookModal = (book = null) => {
  const selectedCategoryId = Array.isArray(book?.category)
    ? book.category[0]?._id || book.category[0]?.$oid || book.category[0] || ""
    : "";

  loadBookCategories(selectedCategoryId);

  const modal = new bootstrap.Modal(document.getElementById("bookModal"));
  const form = document.getElementById("book-form");

  form.reset();

  document.getElementById("book-id").value = book ? book._id : "";
  document.getElementById("book-title").value = book ? book.title : "";
  document.getElementById("book-author").value = book ? book.author : "";
  document.getElementById("book-publisher").value = book ? book.publisher : "";
  document.getElementById("book-category").value = selectedCategoryId;
  document.getElementById("book-published").value = book
    ? new Date(book.published).toISOString().split("T")[0]
    : "";

  modal.show();
};

document.addEventListener("DOMContentLoaded", function () {
  const firstNavItem = document.querySelector(".sidebar .nav-item");
  if (firstNavItem) {
    loadContent("dashboard", firstNavItem);
  }
});

document.addEventListener("submit", function (e) {
  if (e.target.id === "book-form") {
    e.preventDefault();

    const fields = {
      title: document.getElementById("book-title"),
      author: document.getElementById("book-author"),
      publisher: document.getElementById("book-publisher"),
      category: document.getElementById("book-category"),
      published: document.getElementById("book-published"),
    };

    const id = document.getElementById("book-id").value;
    const data = {
      title: fields.title.value.trim(),
      author: fields.author.value.trim(),
      publisher: fields.publisher.value.trim(),
      category: fields.category.value,
      published: fields.published.value,
    };

    const method = id ? "PUT" : "POST";
    const endpoint = id ? `${API_BASE}/books/${id}` : `${API_BASE}/books`;

    fetch(endpoint, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        bootstrap.Modal.getInstance(
          document.getElementById("bookModal")
        ).hide();
        loadContent("books");
      })
      .catch((err) => console.error("Error saving book:", err));
  }
});
