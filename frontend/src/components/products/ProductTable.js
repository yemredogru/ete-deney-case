import React,{useState,useEffect,useMemo} from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button } from 'antd';
import Modal from '@mui/material/Modal';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs
  };
}


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Product Name',
    
  },
  {
    id: 'category',
    numeric: true,
    disablePadding: false,
    label: 'Category',
  },
  {
    id: 'amount',
    numeric: true,
    disablePadding: false,
    label: 'Amount',
  },
  {
    id: 'unit',
    numeric: true,
    disablePadding: false,
    label: 'Amount Unit',
  },
  {
    id: 'company',
    numeric: true,
    disablePadding: false,
    label: 'Company',
  },
  {
    id: 'actions',
    numeric: true,
    disablePadding: false,
    label: 'Actions',
  },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected,selected,isChanged,setSelected } = props;
  const [open,setOpen]=useState(false)
  const changeOpen=()=>{
    setOpen(true)
  }
  const handleClose=()=>{
    setOpen(false)
  }
  const deleteProduct=async()=>{
    console.log(selected)
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    await axios.delete('http://localhost:80/product/delete-product',{
      data:{product_list:selected}
    },config)
    toast.success("Company deleted successfully")
    isChanged(true)
    setSelected([])
    handleClose()
  }
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={changeOpen}>
            <DeleteIcon />
          </IconButton>
          <Dialog
        open={open}
        
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are u sure delete selected products ? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={deleteProduct}>Agree</Button>
        </DialogActions>
      </Dialog>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function EnhancedTable({change}) {
  const [open,setOpen]=useState(false)
  const [item,setItem]=useState([])
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('calories');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [current,setCurrent] = useState([])
  const [data, setData] = useState([]); // Verileri saklayacak bir state ekleyin
  const [isLoading,setIsLoading]=useState(true)
  const [selectedCompany,setSelectedCompany]=useState(true)
  const [companies,setCompanies]=useState([])
  const [isChanged,setIsChanged]=useState(false)
  const changeCompany=(value)=>{
      setCurrent({...current,company:{_id:value}})
  }

  const saveData=async()=>{
    const updatedData = {
      id: current._id,
      category:current.category,
      amountUnit:current.amountUnit,
      amount:current.amount,
      company:current.company._id
      // Diğer güncellenmesi gereken alanları buraya ekleyin
    };
    await axios.put('http://localhost:80/product/update-product', updatedData)
    .then((response) => {
      console.log('Başarıyla güncellendi:', response.data);
      fetchData()
      toast.success("Product updated successfully")
    })
    .catch((error) => {
      console.error('Güncelleme hatası:', error);
      toast.error(error)
    });
  }
  // ...

  // Verileri getirmek için bir etkileşimli işlev tanımlayın
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:80/company/all-companies'); // API endpointini buraya ekleyin
      const products = await axios.get('http://localhost:80/product/products'); // API endpointini buraya ekleyin
      setCompanies(response.data.message)
      setData(products.data.message); // Verileri state'e kaydedin
      setIsLoading(false)
    } catch (error) {
      console.error('Veri alma hatası:', error);
    }
  };

  // İlk render'da verileri getirin
 useEffect(() => {
    fetchData();
  }, [change,isChanged]);
  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen=()=>{
    setOpen(true)
  }

  const changeCurrentData=(data)=>{
    setCurrent(data)
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(data, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [data,order, orderBy, page, rowsPerPage],
  );
  console.log(current)
  return isLoading ? "Loading...": (
    <Box>
      <Paper >
        <EnhancedTableToolbar  numSelected={selected.length} selected={selected} isChanged={setIsChanged} setSelected={setSelected} />
        <TableContainer>
          <Table
            
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          'aria-labelledby': labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.category}</TableCell>
                    <TableCell align="right">{row.amount}</TableCell>
                    <TableCell align="right">{row.amountUnit}</TableCell>
                    <TableCell align="right">{row.company.name}</TableCell>
                    <TableCell align="right"><Button  onClick={(event) => {
                      event.stopPropagation();
                      setItem(row)
                      changeCurrentData(row)
                      handleOpen()
                    }}>
      Update
    </Button></TableCell>
    
                  </TableRow>
                  
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
       <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style}>
        <TextField
  label="Product Name"
  id="standard-number"
  value={current.name||""} // Burada value özelliğini kullanın
  onChange={(e) => setCurrent({ ...current, name: e.target.value })} // current.name'i güncelleyin
  style={{ marginTop: '10px' }}
  variant='outlined'
/>
<TextField
  label="Category"
  id="outlined-size-small"
  value={current.category||""} // Burada value özelliğini kullanın
  onChange={(e) => setCurrent({ ...current, category: e.target.value })} // current.legalnumber'ı güncelleyin
  style={{ marginTop: '10px' }}
  size="small"
  variant='outlined'
/>
<TextField
  label="Amount"
  id="outlined-size-small"
  value={current.amount||""} // Burada value özelliğini kullanın
  onChange={(e) => setCurrent({ ...current, amount: e.target.value })} // current.inc'i güncelleyin
  style={{ marginTop: '10px' }}
  size="small"
  variant='outlined'
/>
<TextField
  label="Amount Unit"
  id="outlined-size-small"
  value={current.amountUnit||""} // Burada value özelliğini kullanın
  onChange={(e) => setCurrent({ ...current, amountUnit: e.target.value })} // current.website'i güncelleyin
  style={{ marginTop: '10px' }}
  size="small"
  variant='outlined'
/>
        <InputLabel id="demo-simple-select-helper-label">Company</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          label="Company"
          sx={{minWidth:'200px'}}
          onChange={(e)=>changeCompany(e.target.value)}
          value={current.company?._id||""}
        >
          {companies.map((item, index) => (
  <MenuItem key={index} value={item._id}>
    {item.name}
  </MenuItem>
))} 
        </Select>
 

          <Stack spacing={2} direction="row">
                       <Button variant="outlined" onClick={handleClose}>Cancel</Button>
                       <Button variant="contained" onClick={saveData}>Save</Button>
                     </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
