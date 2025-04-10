import React, { useState, useEffect } from 'react';
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Dialog,DialogTitle,DialogContent,DialogActions,TextField,MenuItem,IconButton, Box} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { format, parseISO } from 'date-fns';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const LeaveManagement = () => {
  const [open, setOpen] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({fromDate: null,toDate: null,reason: '',leaveType: ''});
  const leaveTypes = [
    { value: 'casual', label: 'Casual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'annual', label: 'Annual Leave' },
    { value: 'other', label: 'Other' }
  ];
  useEffect(() => {
    const storedData = localStorage.getItem('leaveData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData).map(item => ({...item, fromDate: item.fromDate,toDate: item.toDate}));
        setLeaveData(parsedData);
      } catch (e) {
        console.error('Error parsing leave data', e);
      }
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('leaveData', JSON.stringify(leaveData));
  }, [leaveData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  const handleSubmit = () => {
    if (!formData.fromDate || !formData.toDate || !formData.reason || !formData.leaveType) {
      return;
    }
    const newLeave = {
      id: editId || Date.now(),
      fromDate: formData.fromDate.toISOString(),
      toDate: formData.toDate.toISOString(),
      reason: formData.reason,
      leaveType: formData.leaveType,
    };
    if (editId) {
      setLeaveData(prev =>
        prev.map(item => (item.id === editId ? newLeave : item))
      );
    } else {
      setLeaveData(prev => [...prev, newLeave]);
    }
    handleClose();
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ fromDate: null, toDate: null, reason: '', leaveType: '' });
    setEditId(null);
  };
  const handleEdit = (row) => {
    setFormData({
      fromDate: parseISO(row.fromDate),
      toDate: parseISO(row.toDate),
      reason: row.reason,
      leaveType: row.leaveType
    });
    setEditId(row.id);
    setOpen(true);
  };
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave?')) {
      setLeaveData(prev => prev.filter(item => item.id !== id));
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ p: 3 }}>
        <Button variant="contained" onClick={handleOpen} sx={{ mb: 3,fontFamily: 'Georgia, serif',fontWeight:'bold' }}> Create Leave </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#EC155B' }}>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>S/No</TableCell>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>From</TableCell>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>To</TableCell>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>Type</TableCell>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>Reason</TableCell>
                <TableCell sx={{ color: 'white',fontFamily: 'Georgia, serif',fontWeight:'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveData.length > 0 ? (
                leaveData.map((row, index) => (
                  <TableRow key={row.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{format(parseISO(row.fromDate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{format(parseISO(row.toDate), 'dd/MM/yyyy')}</TableCell>
                    <TableCell>
                      {leaveTypes.find(type => type.value === row.leaveType)?.label}
                    </TableCell>
                    <TableCell>{row.reason}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleEdit(row)} sx={{ color: 'green' }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(row.id)} sx={{ color: 'red' }}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" fontFamily={" Georgia, serif" }>No leave requests found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
          <DialogTitle>{editId ? 'Edit Leave Request' : 'Create New Leave Request'}</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2,fontFamily:" Georgia, serif"  }}>
              <DatePicker label="From Date" value={formData.fromDate}onChange={(date) => setFormData(prev => ({ ...prev, fromDate: date }))}renderInput={(params) => <TextField {...params} fullWidth />}/>
              <DatePicker label="To Date" value={formData.toDate} onChange={(date) => setFormData(prev => ({ ...prev, toDate: date }))}renderInput={(params) => <TextField {...params} fullWidth />}/>
              <TextField select label="Leave Type" name="leaveType"value={formData.leaveType} onChange={handleChange}fullWidth>
                {leaveTypes.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))}</TextField>
              <TextField label="Reason" name="reason"value={formData.reason}onChange={handleChange}multilinerows={3}fullWidthrequired/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}fontFamily={" Georgia, serif"}>Cancel</Button>
            <Button onClick={handleSubmit}variant="contained"disabled={
                !formData.fromDate ||
                !formData.toDate ||
                !formData.reason ||
                !formData.leaveType
              }
            >
              {editId ? 'Update' : 'Submit'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </LocalizationProvider>
  );
};
export default LeaveManagement;