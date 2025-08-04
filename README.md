
###  Backend 

Create a GET route:
```
/api/books
```

This route should return a list of books using `jsonify`.

Each book object should include:
- `title`
- `author`
- `year`
- `rating` (a number between 1 and 5)

Include at least **5 different books**.

---

###  Frontend 

- On page load, fetch the data from `/api/books`
- Display each book’s:
  - Title
  - Author
  - Year
  - Rating
- Add a button  **filter books by rating** (remember by using map and check if book has rating about 3 for example)
  - Example: show only books with rating 3.0 or higher
