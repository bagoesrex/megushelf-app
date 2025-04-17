function loadContent(section, el) {
  const content = document.getElementById("main-content");
  document
    .querySelectorAll(".sidebar .nav-item")
    .forEach((item) => item.classList.remove("active"));
  el.classList.add("active");

  if (section === "dashboard") {
    content.innerHTML = `
          <h2>Dashboard</h2>
        `;
  } else if (section === "category") {
    content.innerHTML = `
          <h2>Category Management</h2>
        `;
  } else if (section === "books") {
    content.innerHTML = `
          <h2>Book Management</h2>
        `;
  }
}

// Dummy Data
const statsData = {
  totalBooks: 100,
  categories: 8,
};

document.getElementById("total-books").innerText = statsData.totalBooks;
document.getElementById("total-categories").innerText = statsData.categories;
