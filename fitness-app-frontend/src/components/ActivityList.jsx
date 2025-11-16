import { Card, Grid, CardContent, Typography, Box } from "@mui/material";
import {
  AccessTime,
  LocalFireDepartment,
  DirectionsRun,
  DirectionsBike,
  Pool,
} from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getActivities } from "../services/api";

const ActivityList = () => {
  const [activities, setActivities] = useState([]);
  const navigate = useNavigate();

  const fetchActivities = async () => {
    try {
      const response = await getActivities();
      setActivities(response.data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  // Icon based on type
  const getIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return <DirectionsRun color="primary" />;
      case "CYCLING":
        return <DirectionsBike color="primary" />;
      case "SWIMMING":
        return <Pool color="primary" />;
      default:
        return <DirectionsRun color="primary" />;
    }
  };

  return (
    <Box>
      {/* Optional Header Card */}
      <Card sx={{ mb: 2, borderRadius: 3, boxShadow: 3, p: 2 }}>
        <Typography variant="h6" fontWeight={600}>
          Activity History
        </Typography>
      </Card>

      {/* Activity Cards */}
      <Grid container spacing={2} sx={{ p: 1 }}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              sx={{
                cursor: "pointer",
                borderRadius: 2,
                boxShadow: 3,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 6,
                  transform: "scale(1.02)",
                },
                py: 1,
                px: 1,
              }}
              onClick={() => navigate(`/activities/${activity.id}`)}
            >
              <CardContent sx={{ p: 1 }}>
                {/* Header with Icon + Activity Type */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 1,
                  }}
                >
                  {getIcon(activity.type)}
                  <Typography variant="subtitle1" fontWeight={600}>
                    {activity.type}
                  </Typography>
                </Box>

                {/* Duration */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                  <AccessTime fontSize="small" color="action" />
                  <Typography variant="body2">
                    Duration: <strong>{activity.duration || 0}</strong> min
                  </Typography>
                </Box>

                {/* Calories */}
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                    mt: 0.5,
                  }}
                >
                  <LocalFireDepartment fontSize="small" color="error" />
                  <Typography variant="body2">
                    Calories: <strong>{activity.caloriesBurned || 0}</strong>
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ActivityList;
