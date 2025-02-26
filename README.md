# 📒 Notes App

A simple yet powerful Notes App built with modern web technologies to create, update, and delete notes seamlessly. This app integrates **Appwrite** as the backend service and **Redux Toolkit** for efficient state management.

## 🚀 Tech Stack

- **React** – Frontend framework
- **Redux Toolkit** – State management
- **Tailwind CSS** – Styling
- **Appwrite** – Backend for database and authentication

## ✨ Features

- ✅ Create, Read, Update, and Delete (CRUD) notes
- ✅ Real-time synchronization with Appwrite database
- ✅ Global state management using Redux Toolkit
- ✅ Responsive UI built with Tailwind CSS

---

## 🌐 Live Demo

Check out the live demo at [https://ideonote.netlify.app/](https://ideonote.netlify.app/)

---

## 📥 Installation & Setup

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/jsaurabh1906/Notes-App
cd Notes-App
```

### 2️⃣ Install Dependencies

```sh
yarn install  # or npm install
```

### 3️⃣ Configure Appwrite

Follow these steps to set up Appwrite:

- Create a new project on Appwrite Cloud.
- Create a Database and a Collection for storing notes.
- Set up permissions to allow reading and writing of notes.
- Get your API Endpoint, Project ID, and Database ID from Appwrite.
- Update the appwriteConfig.js file with your credentials:

```sh
export const APPWRITE_CONFIG = {
  endpoint: "https://cloud.appwrite.io/v1",
  projectId: "your-project-id",
  databaseId: "your-database-id",
  collectionId: "your-collection-id",
};
```

### OR

Add your credentials as environment variables:

```sh
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_ID=your-collection-id
```

### 4️⃣ Run the App

```sh
yarn start  # or npm start
```

### Usage

Open your browser and navigate to `http://localhost:5173` to see the app in action.

---

## 📝 Contributing

Contributions are welcome! Feel free to submit issues, pull requests, or suggest new features.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
