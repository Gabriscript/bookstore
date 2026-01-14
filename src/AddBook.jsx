import React, { useState } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

function AddBook({ addBook }) {
  const [open, setOpen] = useState(false);
  const [book, setBook] = useState({ title: '', author: '', isbn: '', year: '', price: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = () => {
    addBook(book);
    setBook({ title: '', author: '', isbn: '', year: '', price: '' }); // Reset form
    handleClose();
  };

  const inputChanged = (event) => {
    setBook({ ...book, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ margin: '20px' }}>
      <Button variant="contained" color="primary" onClick={handleOpen}>Add Book</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Book</DialogTitle>
        <DialogContent>
          <TextField name="title" label="Title" value={book.title} onChange={inputChanged} margin="dense" fullWidth variant="standard" />
          <TextField name="author" label="Author" value={book.author} onChange={inputChanged} margin="dense" fullWidth variant="standard" />
          <TextField name="isbn" label="ISBN" value={book.isbn} onChange={inputChanged} margin="dense" fullWidth variant="standard" />
          <TextField name="year" label="Year" value={book.year} onChange={inputChanged} margin="dense" fullWidth variant="standard" />
          <TextField name="price" label="Price (€)" value={book.price} onChange={inputChanged} margin="dense" fullWidth variant="standard" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default AddBook;
