// src/App.js
import React, { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  TextField,
  Alert,
} from "@mui/material";
import QRCodeScanner from "./components/QRCodeScanner";
import FaceRecognition from "./components/faceRecognition";
import Register from "./components/register";
import Login from "./components/login";
import VotingOptions from "./components/votingOptions";
import axios from "axios";
import firebase, { auth } from "./firebaseconfig";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleQRScan = async (decodedText) => {
    console.log("QR Code Scanned:", decodedText);
    setAadhaarNumber(decodedText);
    sendOtp(decodedText);
  };

  const sendOtp = async (aadhaar) => {
    const OTP_URL = "https://developer.uidai.gov.in/otp-server/2.5";
    const AUA_CODE = "public";
    const SUB_AUA_CODE = "public";
    const LICENSE_KEY =
      "MOSuHNHE9vz9h-6m0ZNAocEIWN4osP3PObgu183xWNxnyM3JGyBHw0U";

    try {
      const response = await axios.post(OTP_URL, {
        uid: aadhaar,
        ac: AUA_CODE,
        sa: SUB_AUA_CODE,
        lk: LICENSE_KEY,
        tid: "public",
      });

      if (response.data.success) {
        console.log("OTP sent successfully");
        setOtpSent(true);
      } else {
        console.error("Failed to send OTP", response.data);
      }
    } catch (error) {
      console.error("Error during OTP request", error);
    }
  };

  const verifyOtp = async () => {
    const VERIFY_OTP_URL = "https://developer.uidai.gov.in/verifyotp";
    const AUA_CODE = "public";
    const SUB_AUA_CODE = "public";
    const LICENSE_KEY =
      "MOSuHNHE9vz9h-6m0ZNAocEIWN4osP3PObgu183xWNxnyM3JGyBHw0U";

    try {
      const response = await axios.post(VERIFY_OTP_URL, {
        uid: aadhaarNumber,
        otp: otp,
        ac: AUA_CODE,
        sa: SUB_AUA_CODE,
        lk: LICENSE_KEY,
        tid: "public",
      });

      if (response.data.success) {
        console.log("OTP verification successful");
        setIsAuthenticated(true);
      } else {
        console.error("OTP verification failed", response.data);
      }
    } catch (error) {
      console.error("Error during OTP verification", error);
    }
  };

  const handleFaceAuthenticate = (status) => {
    console.log("Face Authentication:", status);
    setIsAuthenticated(status);
  };

  return (
    <Container>
      <Box textAlign="center" my={4}>
        <Typography variant="h4">Online Voting System</Typography>
      </Box>
      {!isAuthenticated ? (
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <QRCodeScanner onScan={handleQRScan} />
          <FaceRecognition onAuthenticate={handleFaceAuthenticate} />
          <Register />
          <Login />
          {otpSent && (
            <Box mt={2}>
              <TextField
                label="Enter OTP"
                variant="outlined"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                onClick={verifyOtp}
                sx={{ mt: 2 }}
              >
                Verify OTP
              </Button>
            </Box>
          )}
        </Box>
      ) : (
        <Box textAlign="center" mt={4}>
          <Alert severity="success">Welcome, you are authenticated!</Alert>
          <VotingOptions />
        </Box>
      )}
    </Container>
  );
};

export default App;
