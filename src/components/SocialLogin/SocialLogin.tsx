import { Grid } from "@mui/material";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { ROUTES } from "constant";
import { useAuth, useToast } from "context";
import api from "libs/api";
import { useNavigate } from "react-router";

const SocialLogin = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const res = await api.post("/auth/google-login", { tokenId: credential });
  login(res.data.data.accessToken, res.data.data.user);
    navigate(ROUTES.HOME);
      showToast("Google login successful!", "success");
    } catch (err: any) {
      console.error("Google login error:", err);
      showToast(err.response?.data?.message || "Google login failed", "error");
    }
  };

  const handleGoogleFailure = () => {
    showToast("Google login failed. Please try again.", "error");
  };

  return (
    <Grid
      container
      justifyContent="center"
      sx={{ mt: 2 }}
    >
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
        useOneTap
      />
    </Grid>
  );
};

export default SocialLogin;
