# 📚 Megu Management App

Simple APP for book data management and book categories using **Node.js**, **Express**, and **MongoDB**.

## 🚀 Features

- Book Category Management:
- Add, edit, delete, and display all categories
- Book Management:
- Add, edit, delete, and display all books
- Filter by category, text (title, author, publisher), and year of publication

## 🛠️ Technologies Used

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)

## 🛠️ Requirement

- MongoDB installed
- npm or another package manager
- Node.js

## 📦 Installation

1. Clone this repository: 
```bash
 git clone https://github.com/bagoesrex/megushelf-app.git
 cd megushelf-app
 ```
2. Install dependencies:
 ```bash
 npm install
 ```
3. Configure the .env file (optional, unless you encounter an error):
 ```bash
 MONGODB_URI=mongodb://localhost:27017/database_name or mongodb+srv://<username>:<passwordDb>@cluster0.io5olsm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
 ```
4. Run the server:
 ```bash
 npm start
 ```
5. Open Port:
 ```bash
 http://localhost:3000
 ```

## 🔜 Soon As Possible

- [ ] Rewrite the application using **React**
- [ ] Deploy the app to **Vercel**
- [ ] Fix some bugs, like filtering with 3 categories directly
