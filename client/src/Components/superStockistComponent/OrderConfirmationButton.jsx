import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios'; // Import Axios for HTTP requests

const OrderConfirmationButton = ({ sms, smsAlert, productId, status, selectedDateProp, selectedTimeProp }) => {
  const [open, setOpen] = React.useState(false);
  const [customMessage, setCustomMessage] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(selectedDateProp || '');
  const [selectedTime, setSelectedTime] = React.useState(selectedTimeProp || '');
  const [selectedOption, setSelectedOption] = React.useState(status);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      status: selectedOption,
      date: selectedDate,
      time: selectedTime,
      stockistMessage: customMessage
    };
    const token = localStorage.getItem("stockistToken");
    if (!token) {
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5001/api/stockist/order/${productId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Order submitted successfully:", response.data);
    } catch (error) {
      console.error("Error submitting order:", error);
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen} sx={{ borderColor: 'sky' }}>
        {sms}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogContent>
          <form action="" onSubmit={handleSubmit}>
            <DialogContentText id="alert-dialog-description">
              {smsAlert}
              <TextField
                autoFocus
                margin="dense"
                id="sms"
                name="sms"
                label="Custom Message"
                type="text"
                fullWidth
                variant="outlined"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              {status === 'pending' ? (
                <TextField
                  select
                  label="Select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                >
                  <MenuItem value="pending">Pending</MenuItem>
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                </TextField>
              ) : (
                <TextField
                  select
                  label="Select"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: '1rem' }}
                >
                  <MenuItem value="confirmed">Confirmed</MenuItem>
                  <MenuItem value="delivered">Delivered</MenuItem>
                </TextField>
              )}
              <TextField
                autoFocus
                required
                margin="dense"
                id="date"
                name="date"
                type="date"
                fullWidth
                variant="outlined"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                sx={{ marginBottom: '1rem' }}
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="time"
                name="time"
                type="time"
                fullWidth
                variant="outlined"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  step: 300, // 5 min intervals
                }}
                sx={{ marginBottom: '1rem' }}
              />
            </DialogContentText>
            <DialogActions>
              <Button onClick={handleClose} variant="outlined">
                Cancel
              </Button>
              <Button type='submit' variant="contained" color="primary">
                Confirm
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}

export default OrderConfirmationButton;
