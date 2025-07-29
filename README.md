
# 🌍 Wanderlust

Wanderlust is a full-stack travel-themed web application that allows users to explore, review, and manage campgrounds across the world. Built as part of the **Apna College MERN Bootcamp** with guidance from **Shraddha Khapra**, this project showcases RESTful architecture, authentication, cloud-based image upload, and responsive design.

## 🔗 Live Demo

**[Check it out here](https://wanderlust-orcj.onrender.com/listings)**  

---

## 🧰 Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** EJS, Bootstrap 5
- **Authentication:** Passport.js, express-session
- **Image Uploads:** Cloudinary, Multer

---

## ✨ Features

- 📝 Add & edit your own campgrounds 
- 💬 Post and manage reviews on campgrounds
- 🔒 Secure login & register system (Passport Local)
- ☁️ Cloud image storage (Cloudinary integration)
- ⚙️ Custom error handling and form validation
- 🎨 Clean, responsive UI with Bootstrap 5

---


## 🧑‍💻 Installation

```bash
git clone https://github.com/KushagraJadiya24/wanderlust.git
cd wanderlust
npm install
```

### 🔐 Environment Setup

Create a `.env` file in the root with the following:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_cloud_key
CLOUDINARY_SECRET=your_cloud_secret
DB_URL=your_mongodb_url
SECRET=session_secret
```

### 🚀 Run the app

```bash
npm start
```

Visit `http://localhost:3000`

---

## 📚 Learnings

- RESTful routing and MVC architecture
- Session-based authentication & access control
- Image upload 
- Form validation & error handling in Express
- Environment variables and config management

---

## 🙏 Acknowledgements

- [Apna College](https://www.apnacollege.in/)
- [Shraddha Khapra](https://www.linkedin.com/in/shraddha-khapra-30a7b31b3/)

---

## 📜 License

This project is licensed under the MIT License.
