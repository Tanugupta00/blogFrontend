import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, IconButton, Typography, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { GetRequest, DeleteRequest } from '../utils/request';
import EditBlog from "./editblogs";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${TableCell.head}`]: {
    backgroundColor: theme.palette.action.hover,
    fontWeight: "bold"
  },
}));

const AllBlogs = ({ trigger }) => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openView, setOpenView] = useState(false); 

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 

    return `${day}-${month}-${year}`; 
};

  useEffect(() => {
    fetchData();
  }, [trigger]);

  const fetchData = async () => {
    try {
      const response = await GetRequest(`${process.env.REACT_APP_API_URL}posts`);
      setData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };

  const handleDelete = async (id) => {
    try {
      await DeleteRequest(`${process.env.REACT_APP_API_URL}deleteBlogs/${id}`);
      fetchData();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setSelectedBlog(blog);
    setOpenEdit(true);
  };

  const handleView = (blog) => {
    setSelectedBlog(blog);
    setOpenView(true); 
  };

  const handleCloseView = () => {
    setOpenView(false); 
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", padding: 2 }}>
      {data.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ padding: 3, color: "gray" }}>No results found</Typography>
      ) : (
        <>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>#</StyledTableCell>
                  <StyledTableCell>Author</StyledTableCell>
                  <StyledTableCell>Title</StyledTableCell>
                  <StyledTableCell>Published</StyledTableCell>
                  <StyledTableCell>Description</StyledTableCell>
                  <StyledTableCell>View</StyledTableCell> 
                  <StyledTableCell>Edit</StyledTableCell>
                  <StyledTableCell>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((blog, index) => (
                  <TableRow key={blog._id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>                                        {formatDate(blog.publishedAt)} 
</TableCell>
                    <TableCell sx={{ maxWidth: 150, minWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.description}</TableCell>
                    <TableCell>
                      <IconButton color="info" onClick={() => handleView(blog)}> 
                        <VisibilityIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="primary" onClick={() => handleEdit(blog)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton color="error" onClick={() => handleDelete(blog?._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                   
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
          />
        </>
      )}

      <EditBlog open={openEdit} handleClose={() => setOpenEdit(false)} blog={selectedBlog} refreshBlogs={fetchData} />

      <Dialog open={openView} onClose={handleCloseView}>
        <DialogTitle>View Blog</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            value={selectedBlog?.title || ''}
            fullWidth
            margin="normal"
            disabled 
          />
          <TextField
            label="Author"
            value={selectedBlog?.author || ''}
            fullWidth
            margin="normal"
            disabled 
          />
          <TextField
            label="Description"
            value={selectedBlog?.description || ''}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            disabled 
          />
          <TextField
            label="Published"
            value={formatDate(selectedBlog?.publishedAt) || ''}
            fullWidth
            margin="normal"
            disabled 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default AllBlogs;
