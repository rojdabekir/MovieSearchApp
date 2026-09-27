# 🎬 Movie Search App

A movie search web application built with HTML, CSS, and JavaScript. The application uses the TMDB API to search for movies and display detailed information about them.

## 🎮 Live Demo: 

## ✨ Features

* Search for movies by title
* Display movie posters and titles
* View detailed movie information
* Display movie rating, release date, runtime, genres, and plot
* Display information about the cast
* Responsive user interface
* Error handling when a movie cannot be found

## 🔑 API

This project uses the [TMDB API](https://www.themoviedb.org/documentation/api) to retrieve movie information.

The API token is stored in a `.env` file and is not included in the repository.

Create a `.env` file in the root directory:

```env
VITE_TMDB_TOKEN=your_token_here
```

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rojdabekir/MovieSearchApp.git
```

### 2. Navigate to the project folder

```bash
cd MovieSearchApp
```

### 3. Install dependencies

```bash
npm install
```

### 4. Create the `.env` file

Create a `.env` file in the root directory and add your TMDB API token:

```env
VITE_TMDB_TOKEN=your_token_here
```

### 5. Start the development server

```bash
npm run dev
```

Then open the local URL provided by Vite in your browser.

## 📁 Project Structure

```text
MovieSearchApp/
├── index.html
├── src/
│   ├── movieApp.css
│   └── movieScript.js
├── images/
├── .env
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```