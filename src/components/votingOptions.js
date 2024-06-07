import React, { useEffect, useState } from "react";
import { fetchCandidateData } from "../api/CandidateData";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Alert,
} from "@mui/material";

const VotingOptions = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const data = await fetchCandidateData();
        setCandidates(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch candidate data.");
        setLoading(false);
      }
    };

    getCandidates();
  }, []);

  const handleVote = (candidateId) => {
    console.log(`Voted for candidate with ID: ${candidateId}`);
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Voting Options
      </Typography>
      <List>
        {candidates.map((candidate) => (
          <ListItem
            key={candidate.id}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <ListItemText primary={`${candidate.name} (${candidate.party})`} />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleVote(candidate.id)}
            >
              Vote
            </Button>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default VotingOptions;
