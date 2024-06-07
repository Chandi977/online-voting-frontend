import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  Alert,
} from "@mui/material";

const FaceRecognition = ({ onAuthenticate }) => {
  const videoRef = useRef(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [detectionStatus, setDetectionStatus] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = "/models";
      await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
      await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
      await faceapi.loadFaceRecognitionModel(MODEL_URL);
      setModelsLoaded(true);
    };
    loadModels();
  }, []);

  useEffect(() => {
    if (modelsLoaded && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
        videoRef.current.srcObject = stream;
      });
    }
  }, [modelsLoaded]);

  const startVideo = () => {
    setScanning(true);
  };

  useEffect(() => {
    if (scanning && videoRef.current) {
      const interval = setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptors();
        if (detections.length > 0) {
          onAuthenticate(true);
          setDetectionStatus("Face detected, authentication successful!");
          clearInterval(interval);
        } else {
          onAuthenticate(false);
          setDetectionStatus("No face detected, please try again.");
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [scanning, onAuthenticate]);

  return (
    <Box textAlign="center" mt={2}>
      {!modelsLoaded ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <CircularProgress />
          <Typography variant="h6" mt={2}>
            Loading face recognition models...
          </Typography>
        </Box>
      ) : (
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={startVideo}
            disabled={scanning}
          >
            {scanning ? "Scanning..." : "Start Face Scan"}
          </Button>
          <video
            ref={videoRef}
            autoPlay
            style={{ width: "100%", marginTop: "16px" }}
          />
          {detectionStatus && (
            <Alert
              severity={
                detectionStatus.includes("successful") ? "success" : "error"
              }
              sx={{ mt: 2 }}
            >
              {detectionStatus}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
};

export default FaceRecognition;
