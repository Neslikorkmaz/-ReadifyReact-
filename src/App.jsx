
import { useEffect, useState } from "react";
import "./App.css";

const initialBooks = [
  {
    id: 1,
    title: "The Art of Stillness",
    author: "Mira Bennett",
    category: "Personal Growth",
    status: "Reading",
    cover: "cover-one",
    symbol: "✳",
  },
  {
    id: 2,
    title: "Gardens of Memory",
    author: "Elena Rose",
    category: "Fiction",
    status: "Want to read",
    cover: "cover-two",
    symbol: "❋",
  },
  {
    id: 3,
    title: "A Thousand Mornings",
    author: "Theo Jameson",
    category: "Poetry",
    status: "Finished",
    cover: "cover-three",
    symbol: "☼",
  },
  {
    id: 4,
    title: "The Quiet Atlas",
    author: "Nora Wells",
    category: "Adventure",
    status: "Want to read",
    cover: "cover-four",
    symbol: "❧",
  },
];

const coverStyles = [
  { cover: "cover-one", symbol: "✳" },
  { cover: "cover-two", symbol: "❋" },
  { cover: "cover-three", symbol: "☼" },
  { cover: "cover-four", symbol: "❧" },
];

function App() {
  const [books, setBooks] = useState(() => {
    try {
      const savedBooks = localStorage.getItem("readify-books");
      return savedBooks ? JSON.parse(savedBooks) : initialBooks;
    } catch {
      return initialBooks;
    }
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All books");
  const [editingId, setEditingId] = useState(null);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fiction");
  const [status, setStatus] = useState("Want to read");

  useEffect(() => {
    localStorage.setItem("readify-books", JSON.stringify(books));
  }, [books]);

  const completedCount = books.filter(
    (book) => book.status === "Finished"
  ).length;

  const readingCount = books.filter(
    (book) => book.status === "Reading"
  ).length;

  const visibleBooks = books.filter((book) => {
    const searchText = `${book.title} ${book.author} ${book.category}`
      .toLowerCase();

    const matchesSearch = searchText.includes(search.toLowerCase());

    const matchesFilter =
      filter === "All books" || book.status === filter;

    return matchesSearch && matchesFilter;
  });

  function resetForm() {
    setTitle("");
    setAuthor("");
    setCategory("Fiction");
    setStatus("Want to read");
    setEditingId(null);
  }

  function handleSubmit(event) {
    event.preventDefault();

    const cleanTitle = title.trim();
    const cleanAuthor = author.trim();

    if (!cleanTitle || !cleanAuthor) {
      return;
    }

    if (editingId !== null) {
      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === editingId
            ? { ...book, title: cleanTitle, author: cleanAuthor, category, status }
            : book
        )
      );
    } else {
      const nextCover =
        coverStyles[Math.floor(Math.random() * coverStyles.length)];

      const newBook = {
        id: Date.now(),
        title: cleanTitle,
        author: cleanAuthor,
        category,
        status,
        ...nextCover,
      };

      setBooks((currentBooks) => [...currentBooks, newBook]);
    }

    resetForm();
  }

  function handleEdit(book) {
    setEditingId(book.id);
    setTitle(book.title);
    setAuthor(book.author);
    setCategory(book.category);
    setStatus(book.status);

    document.getElementById("book-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  function handleDelete(id) {
    const confirmed = window.confirm(
      "Bu kitabı kitaplığından silmek istiyor musun?"
    );

    if (!confirmed) return;

    setBooks((currentBooks) =>
      currentBooks.filter((book) => book.id !== id)
    );

    if (editingId === id) {
      resetForm();
    }
  }

  function goToForm() {
    resetForm();

    document.getElementById("book-form")?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <a className="brand" href="#">
          <span className="brand-icon">r.</span>
          <span>readify<span className="brand-dot">.</span></span>
        </a>

        <p className="menu-label">YOUR SPACE</p>

        <nav className="navigation">
          <a className="nav-item active" href="#library">
            <span>▦</span> My Library
          </a>
          <a className="nav-item" href="#goals">
            <span>◎</span> Reading Goals
          </a>
          <a className="nav-item" href="#discover">
            <span>✳</span> Discover
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="quote-mark">“</div>
          <p>A book is a dream you hold in your hands.</p>
          <span>— Neil Gaiman</span>
        </div>

        <div className="profile">
          <div className="avatar">R</div>
          <div>
            <strong>My Reading Space</strong>
            <small>Personal library</small>
          </div>
          <span className="profile-more">···</span>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <span className="breadcrumb">My Space <span>/</span> Library</span>
          <div className="topbar-right">
            <span className="today">A little time for yourself ✦</span>
            <div className="avatar small-avatar">R</div>
          </div>
        </header>

        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">YOUR PERSONAL READING SPACE</p>
            <h1>Every book opens<br />a <em>new world.</em></h1>
            <p className="hero-description">
              Keep your stories close. Track your reading journey,
              one beautiful page at a time.
            </p>
            <div className="hero-actions">
              <button className="primary-button" onClick={goToForm}>
                ＋ Add a book
              </button>
              <a className="text-button" href="#library">
                Explore library ↗
              </a>
            </div>
          </div>

          <div className="hero-art">
            <div className="sun-circle" />
            <div className="plant plant-one">❧</div>
            <div className="art-book art-book-back">THE<br />SLOW<br />LIVING</div>
            <div className="art-book art-book-middle">little<br /><i>moments</i></div>
            <div className="art-book art-book-front">
              <span>THE ART OF</span>
              <strong>being<br />present</strong>
              <small>A COLLECTION OF THOUGHTS</small>
            </div>
            <div className="art-caption">A world between the pages</div>
          </div>
        </section>

        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon sage">▤</div>
            <div>
              <p>Books in library</p>
              <strong>{books.length}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon peach">◷</div>
            <div>
              <p>Currently reading</p>
              <strong>{readingCount}</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon sand">✳</div>
            <div>
              <p>Books completed</p>
              <strong>{completedCount}</strong>
            </div>
          </div>
        </section>

        <section className="library-section" id="library">
          <div className="section-heading">
            <div>
              <p className="eyebrow">A COLLECTION OF STORIES</p>
              <h2>Your bookshelf<span>.</span></h2>
            </div>

            <button className="view-all" onClick={goToForm}>
              + Add new
            </button>
          </div>

          <div className="library-toolbar">
            <label className="search-box">
              <span>⌕</span>
              <input
                type="search"
                placeholder="Find a book or author..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <div className="filter-chips">
              {["All books", "Reading", "Want to read", "Finished"].map(
                (option) => (
                  <button
                    key={option}
                    className={`filter-chip ${filter === option ? "selected" : ""}`}
                    onClick={() => setFilter(option)}
                  >
                    {option}
                  </button>
                )
              )}
            </div>
          </div>

          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.id}>
                <div className={`book-cover ${book.cover}`}>
                  <span className="cover-symbol">{book.symbol}</span>
                  <div className="cover-title">{book.title}</div>
                  <span className="cover-author">{book.author}</span>
                  <span className="cover-number">READIFY EDITION</span>
                </div>

                <div className="book-info">
                  <div>
                    <h3>{book.title}</h3>
                    <p>{book.author}</p>
                    <span className="book-category">{book.category}</span>
                  </div>
                </div>

                <span className="status">{book.status}</span>

                <div className="book-actions">
                  <button onClick={() => handleEdit(book)}>Edit</button>
                  <button onClick={() => handleDelete(book.id)}>Delete</button>
                </div>
              </article>
            ))}
          </div>

          {visibleBooks.length === 0 && (
            <p className="empty-message">
              No books found. Try another search or add a new book.
            </p>
          )}

          <section className="add-section" id="book-form">
            <div>
              <p className="eyebrow">
                {editingId !== null ? "UPDATE YOUR COLLECTION" : "MAKE ROOM FOR ANOTHER STORY"}
              </p>
              <h2>
                {editingId !== null ? "Edit your book." : "Add a new story."}
              </h2>
              <p>Keep your reading journey organised.</p>
            </div>

            <form className="book-entry-form" onSubmit={handleSubmit}>
              <label>
                Book title
                <input
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </label>

              <label>
                Author
                <input
                  value={author}
                  onChange={(event) => setAuthor(event.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                >
                  <option>Fiction</option>
                  <option>Personal Growth</option>
                  <option>Fantasy</option>
                  <option>Adventure</option>
                  <option>Poetry</option>
                  <option>Science</option>
                  <option>History</option>
                  <option>Other</option>
                </select>
              </label>

              <label>
                Reading status
                <select
                  value={status}
                  onChange={(event) => setStatus(event.target.value)}
                >
                  <option>Want to read</option>
                  <option>Reading</option>
                  <option>Finished</option>
                </select>
              </label>

              <div className="form-actions">
                <button className="primary-button" type="submit">
                  {editingId !== null ? "Save changes" : "＋ Add book"}
                </button>

                {editingId !== null && (
                  <button
                    className="cancel-button"
                    type="button"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </section>

          <footer className="footer">
            <span>readify<span className="brand-dot">.</span></span>
            <p>Made for the love of reading ♡</p>
          </footer>
        </section>
      </main>
    </div>
  );
}

export default App;
