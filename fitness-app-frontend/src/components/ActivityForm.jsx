import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { addActivity } from "../services/api";

const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({
    type: "RUNNING",
    duration: "",
    caloriesBurned: "",
    additionalMetrics: {},
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error("Error submitting activity:", error);
    }
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Add New Activity
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="activity-type-label">Activity Type</InputLabel>
            <Select
              labelId="activity-type-label"
              value={activity.type}
              label="Activity Type"
              onChange={(e) =>
                setActivity({ ...activity, type: e.target.value })
              }
            >
              <MenuItem value="RUNNING">Running</MenuItem>
              <MenuItem value="CYCLING">Cycling</MenuItem>
              <MenuItem value="SWIMMING">Swimming</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Duration (minutes)"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={activity.duration}
            onChange={(e) =>
              setActivity({ ...activity, duration: e.target.value })
            }
          />

          <TextField
            label="Calories Burned"
            type="number"
            fullWidth
            sx={{ mb: 2 }}
            value={activity.caloriesBurned}
            onChange={(e) =>
              setActivity({
                ...activity,
                caloriesBurned: e.target.value,
              })
            }
          />

          <Button type="submit" variant="contained" fullWidth>
            Add Activity
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
