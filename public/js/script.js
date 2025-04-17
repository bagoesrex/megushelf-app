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

      if (section === "dashboard") {
        // Stats Dummy
        const statsData = {
          totalBooks: 100,
          categories: 8,
        };

        document.getElementById("total-books").innerText = statsData.totalBooks;
        document.getElementById("total-categories").innerText =
          statsData.categories;

        // Book list Dummy
        const bookList = [
          {
            id: 1,
            title: "The Explosion",
            author: "Megumin",
            publisher: "Sikucink",
            category: "Novel",
            published: 2001,
          },
          {
            id: 2,
            title: "Brief History of Time",
            author: "Stephen Hawking",
            publisher: "Bantam Books",
            category: "Science",
            published: 1988,
          },
          {
            id: 3,
            title: "1984",
            author: "George Orwell",
            publisher: "Secker & Warburg",
            category: "Dystopian",
            published: 1949,
          },
          {
            id: 4,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            publisher: "Harvill Secker",
            category: "History",
            published: 2011,
          },
          {
            id: 5,
            title: "Clean Code",
            author: "Robert C. Martin",
            publisher: "Prentice Hall",
            category: "Programming",
            published: 2008,
          },
        ];

        const tbody = document.getElementById("book-table-body");

        bookList.forEach((book, index) => {
          const row = `
            <tr>
              <td>${index + 1}</td>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.publisher}</td>
              <td>${book.category}</td>
              <td>${book.published}</td>
              <td><button class="btn btn-sm btn-info text-white">Detail</button></td>
            </tr>
          `;
          tbody.innerHTML += row;
        });
      } else if (section === "category") {
      } else if (section === "books") {
      }
    })
    .catch((err) => {
      content.innerHTML = `<h2>Error loading content</h2>`;
      console.error("Error loading content:", err);
    });
}

document.addEventListener("DOMContentLoaded", function () {
  const firstNavItem = document.querySelector(".sidebar .nav-item");
  if (firstNavItem) {
    loadContent("dashboard", firstNavItem);
  }
});
