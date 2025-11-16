import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Stack,
  Chip,
} from "@mui/material";
import {
  AccessTime,
  LocalFireDepartment,
  CalendarMonth,
  DirectionsRun,
  DirectionsBike,
  Pool,
  EmojiObjects,
  LightbulbCircle,
  Security,
} from "@mui/icons-material";
import { getActivitiesDetails } from "../services/api";

const ActivityDetail = () => {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      try {
        const response = await getActivitiesDetails(id);

        // FIX: Backend probably returns "calories" instead of "caloriesBurned"
        setActivity({
          ...response.data,
          duration: response.data.duration ?? response.data.time ?? 0,
          caloriesBurned:
            response.data.caloriesBurned ??
            response.data.calories ??
            response.data.kcal ??
            0,
        });
      } catch (error) {
        console.error("Error fetching activity details:", error);
      }
    };
    fetchActivityDetails();
  }, [id]);

  if (!activity) {
    return (
      <Typography
        variant="h6"
        sx={{ textAlign: "center", mt: 5, color: "text.secondary" }}
      >
        Loading activity details...
      </Typography>
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "RUNNING":
        return <DirectionsRun color="primary" fontSize="large" />;
      case "CYCLING":
        return <DirectionsBike color="primary" fontSize="large" />;
      case "SWIMMING":
        return <Pool color="primary" fontSize="large" />;
      default:
        return <EmojiObjects color="primary" fontSize="large" />;
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: "auto", p: 2 }}>
      {/* Header */}
      <Typography
        variant="h4"
        fontWeight={600}
        gutterBottom
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          gap: 1,
        }}
      >
        {getActivityIcon(activity.type)}
        Activity Details
      </Typography>

      {/* Activity Card */}
      <Card
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: 2,
          background: "linear-gradient(145deg, #e8f4ff, #ffffff)",
          py: 0.5, // reduced vertical padding
        }}
      >
        <CardContent sx={{ p: 1.5 }}>
          {" "}
          {/* reduced padding */}
          {/* Header Row */}
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ mb: 0.5 }} // smaller margin
          >
            <Chip
              label={activity.type}
              color="primary"
              variant="filled"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                height: 26, // smaller chip
              }}
            />

            <Typography variant="caption" color="text.secondary">
              <CalendarMonth sx={{ mr: 0.3, fontSize: 16 }} />
              {new Date(activity.createdAt).toLocaleString()}
            </Typography>
          </Stack>
          {/* Body: Duration + Calories */}
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-around"
            sx={{ mt: 0.5 }}
          >
            <Box textAlign="center">
              <AccessTime color="primary" sx={{ fontSize: 26 }} />{" "}
              {/* smaller icon */}
              <Typography variant="subtitle2" sx={{ mt: 0.3 }}>
                {activity.duration} min
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Duration
              </Typography>
            </Box>

            <Box textAlign="center">
              <LocalFireDepartment color="error" sx={{ fontSize: 26 }} />
              <Typography variant="subtitle2" sx={{ mt: 0.3 }}>
                {activity.caloriesBurned} kcal
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Calories
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          background: "linear-gradient(145deg, #f9fbe7, #ffffff)",
        }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#2e7d32",
            }}
          >
            <LightbulbCircle />
            AI Recommendations
          </Typography>

          <Typography variant="body1" sx={{ mb: 1 }}>
            {activity.recommendation || "No AI analysis available."}
          </Typography>

          <Divider sx={{ my: 1 }} />

          {activity.improvements?.length > 0 && (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: "#1565c0",
                  mb: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <EmojiObjects /> Improvements
              </Typography>

              {activity.improvements.map((item, idx) => (
                <Typography key={idx} sx={{ pl: 2 }}>
                  • {item}
                </Typography>
              ))}

              <Divider sx={{ my: 1 }} />
            </>
          )}

          {activity.suggestions?.length > 0 && (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: "#f57c00",
                  mb: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <EmojiObjects /> Suggestions
              </Typography>

              {activity.suggestions.map((item, idx) => (
                <Typography key={idx} sx={{ pl: 2 }}>
                  • {item}
                </Typography>
              ))}

              <Divider sx={{ my: 1 }} />
            </>
          )}

          {activity.safety?.length > 0 && (
            <>
              <Typography
                variant="h6"
                sx={{
                  color: "#d32f2f",
                  mb: 1,
                  display: "flex",
                  gap: 1,
                }}
              >
                <Security /> Safety Guidelines
              </Typography>

              {activity.safety.map((item, idx) => (
                <Typography key={idx} sx={{ pl: 2 }}>
                  • {item}
                </Typography>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
