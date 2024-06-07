import axios from "axios";

export const fetchCandidateData = async () => {
  try {
    const response = await axios.get(
      "https://www.googleapis.com/civicinfo/v2/voterinfo?key=YOUR_API_KEY&address=1263%20Pacific%20Ave.%20Kansas%20City%20KS&electionId=2000"
    );
    // Adjust the response parsing based on actual API response structure
    return response.data.candidates;
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    return [];
  }
};
