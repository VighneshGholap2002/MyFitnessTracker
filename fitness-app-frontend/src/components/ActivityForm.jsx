import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Button,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import {
  FitnessCenter,
  DirectionsRun,
  DirectionsBike,
  Pool,
  AddCircle,
} from "@mui/icons-material";
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

  const getActivityIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return <DirectionsRun color="primary" fontSize="large" />;
      case "CYCLING":
        return <DirectionsBike color="primary" fontSize="large" />;
      case "SWIMMING":
        return <Pool color="primary" fontSize="large" />;
      default:
        return <FitnessCenter color="primary" fontSize="large" />;
    }
  };

  return (
    <Card
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 5,
        boxShadow: 6,
        borderRadius: 4,
        background: "linear-gradient(135deg, #e3f2fd, #ffffff)",
      }}
    >
      <CardHeader
        title={
          <Typography
            variant="h5"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <FitnessCenter color="primary" />
            Add New Activity
          </Typography>
        }
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          textAlign: "center",
        }}
      />

      <CardContent>
        <Box component="form" onSubmit={handleSubmit}>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="activity-type-label">Activity Type</InputLabel>
            <Select
              labelId="activity-type-label"
              value={activity.type}
              label="Activity Type"
              onChange={(e) =>
                setActivity({ ...activity, type: e.target.value })
              }
              sx={{ borderRadius: 2 }}
            >
              <MenuItem value="RUNNING">
                <Stack direction="row" spacing={1} alignItems="center">
                  <DirectionsRun color="primary" /> <span>Running</span>
                </Stack>
              </MenuItem>
              <MenuItem value="CYCLING">
                <Stack direction="row" spacing={1} alignItems="center">
                  <DirectionsBike color="primary" /> <span>Cycling</span>
                </Stack>
              </MenuItem>
              <MenuItem value="SWIMMING">
                <Stack direction="row" spacing={1} alignItems="center">
                  <Pool color="primary" /> <span>Swimming</span>
                </Stack>
              </MenuItem>
            </Select>
          </FormControl>

          <Box textAlign="center" sx={{ mb: 3 }}>
            {getActivityIcon(activity.type)}
          </Box>

          <TextField
            label="Duration (minutes)"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={activity.duration}
            onChange={(e) =>
              setActivity({ ...activity, duration: e.target.value })
            }
          />

          <TextField
            label="Calories Burned"
            type="number"
            fullWidth
            variant="outlined"
            sx={{ mb: 3 }}
            value={activity.caloriesBurned}
            onChange={(e) =>
              setActivity({ ...activity, caloriesBurned: e.target.value })
            }
          />

          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<AddCircle />}
              sx={{
                px: 4,
                py: 1,
                borderRadius: 3,
                textTransform: "none",
                fontSize: "1rem",
                boxShadow: 3,
                transition: "all 0.3s",
                "&:hover": { transform: "scale(1.05)", boxShadow: 6 },
              }}
            >
              Add Activity
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityForm;
