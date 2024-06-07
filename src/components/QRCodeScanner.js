// src/components/QRCodeScanner.js
import React, { useState, useRef, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import { BrowserMultiFormatReader } from "@zxing/library";

const QRCodeScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    if (scanning) {
      codeReader
        .decodeFromVideoDevice(null, videoRef.current, (result, err) => {
          if (result) {
            onScan(result.getText());
            setScanning(false);
            codeReader.reset();
          }
        })
        .catch((err) => console.error(err));
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning, onScan]);

  return (
    <Box textAlign="center" mt={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setScanning(true)}
      >
        Start QR Scan
      </Button>
      {scanning && (
        <video ref={videoRef} style={{ width: "100%", marginTop: "16px" }} />
      )}
    </Box>
  );
};

export default QRCodeScanner;
