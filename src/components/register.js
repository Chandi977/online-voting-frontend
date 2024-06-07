import React, { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { aadhaarNumber, name, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await axios.post("/api/users/register", formData);
      setSuccess("Registration successful!");
      setError(null);
      setLoading(false);
    } catch (err) {
      setError("Registration failed. Please try again.");
      setSuccess(null);
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Register
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="aadhaarNumber"
        label="Aadhaar Number"
        name="aadhaarNumber"
        value={aadhaarNumber}
        onChange={onChange}
        autoComplete="aadhaar"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Name"
        name="name"
        value={name}
        onChange={onChange}
        autoComplete="name"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        value={email}
        onChange={onChange}
        autoComplete="email"
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        value={password}
        onChange={onChange}
        autoComplete="current-password"
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Register
        </Button>
        {loading && <CircularProgress size={24} />}
      </Box>
    </Box>
  );
};

export default Register;
