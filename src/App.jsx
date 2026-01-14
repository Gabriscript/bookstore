import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import database from './firebase';
import AddBook from './AddBook';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [books, setBooks] = useState([]);

  const columnDefs = [
    { field: 'title', sortable: true, filter: true },
    { field: 'author', sortable: true, filter: true },
    { field: 'year', sortable: true, filter: true },
    { field: 'isbn', sortable: true, filter: true },
    { field: 'price', sortable: true, filter: true },
    {
      headerName: '',
      field: 'id',
      width: 70,
      cellRenderer: (params) => (
        <IconButton onClick={() => deleteBook(params.value)} size="small" color="error">
          <DeleteIcon />
        </IconButton>
      )
    }
  ];

  useEffect(() => { fetchBooks(); }, []);

  const fetchBooks = () => {
    database.ref('books').on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const booksArray = Object.entries(data).map(([id, book]) => ({ ...book, id }));
        setBooks(booksArray);
      } else {
        setBooks([]);
      }
    });
  };

  const addBook = (newBook) => {
    database.ref('books').push(newBook);
  };

  const deleteBook = (id) => {
    database.ref(`books/${id}`).remove();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">Bookstore</Typography>
        </Toolbar>
      </AppBar>
      <AddBook addBook={addBook} />
      <div className="ag-theme-material" style={{ height: 450, width: '90%', margin: 'auto' }}>
        <AgGridReact rowData={books} columnDefs={columnDefs} />
      </div>
    </>
  );
}
export default App;
