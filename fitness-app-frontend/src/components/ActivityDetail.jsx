import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Card, CardContent, Divider } from "@mui/material";
import { getActivitiesDetails } from "../services/api";

const ActivityDetail = () => {
  console.log("ActivityDetail component mounted");
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [recommendation, setRecommendation] = useState([]);
  useEffect(() => {
    console.log("Fetching activity details for ID:", id); // ✅ ID check

    const fetchActivityDetails = async () => {
      try {
        console.log("Activity response:");
        const response = await getActivitiesDetails(id);
        console.log("Activity response:", response.data);
        setActivity(response.data);
        setRecommendation(response.data.recommendation);
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    };
    fetchActivityDetails();
  }, [id]);
  console.log("Activity response:");
  if (!activity) {
    return <Typography>Loading activity details...</Typography>;
  }

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Activity Details
          </Typography>
          <Typography>Type: {activity.type}</Typography>
          <Typography>Duration: {activity.duration} minutes</Typography>
          <Typography>Calories Burned: {activity.caloriesBurned}</Typography>
          <Typography>
            Date: {new Date(activity.createdAt).toLocaleString()}
          </Typography>
        </CardContent>
      </Card>

      {recommendation && (
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              AI Recommendations
            </Typography>
            <Typography variant="h6">Analysis</Typography>
            <Typography>{activity.recommendation}</Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Improvements</Typography>
            {activity?.improvements?.map((improvements, index) => (
              <Typography key={index}>- {improvements}</Typography>
            ))}

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6">Suggestions</Typography>
            {activity?.suggestions?.map((suggestions, index) => (
              <Typography key={index}>- {suggestions}</Typography>
            ))}

            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Saftey Guidelines</Typography>
            {activity?.safety?.map((safety, index) => (
              <Typography key={index}>- {safety}</Typography>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default ActivityDetail;
