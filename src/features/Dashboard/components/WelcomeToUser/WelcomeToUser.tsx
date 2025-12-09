import { Logout } from "@mui/icons-material";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Divider,
  Avatar,
  Grid,
} from "@mui/material";
import { useAuth, useToast } from "context";
import { useNavigate } from "react-router";
import { ROUTES } from "constant";

const WelcomeToUser = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate(ROUTES.LOGIN);
    showToast("Logout successful", "success");
  };

  const formatDateTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: { xs: "90%", sm: 750 },
          borderRadius: 4,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
          p: 3,
          mx: 'auto',
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.18)",
          },
        }}
      >
        <CardContent>
          <Stack spacing={2} alignItems="center">
            {user?.avatar ? (
              <Avatar
                src={user.avatar}
                alt={user.name || "User Avatar"}
                sx={{ width: 90, height: 90, border: "2px solid #1976d2" }}
              />
            ) : (
              <Avatar sx={{ width: 90, height: 90, bgcolor: "primary.light" }}>
                {user?.name?.charAt(0)}
              </Avatar>
            )}
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: "primary.main", letterSpacing: 0.5 }}
            >
              Welcome {user?.name || "User"}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ maxWidth: 320 }}
            >
              Here’s your account information
            </Typography>
          </Stack>

          <Divider sx={{ my: 3 }} />

          {user && (
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  User ID
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.id}
                </Typography>
              </Grid>

              {user.email && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.email}
                  </Typography>
                </Grid>
              )}

              {user.name && (
                <Grid size={{ xs: 12, sm: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.name}
                  </Typography>
                </Grid>
              )}

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Account Created
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatDateTime(user.iat)}
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <Typography variant="body2" color="text.secondary">
                  Token Expiry
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {formatDateTime(user.exp)}
                </Typography>
              </Grid>
            </Grid>
          )}

          <Divider sx={{ my: 3 }} />

          <Button
            fullWidth
            variant="contained"
            color="error"
            startIcon={<Logout />}
            sx={{
              fontWeight: 600,
              py: 1.5,
              textTransform: "none",
              transition: "all 0.3s",
              "&:hover": { transform: "scale(1.03)" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default WelcomeToUser;
