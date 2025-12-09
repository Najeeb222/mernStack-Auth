import { useNavigate } from "react-router";
import { Button, Checkbox, Divider, FormControlLabel, Stack, Typography } from "@mui/material";
import { CustomTextField, PasswordField, SocialLogin } from "components";
import { COLORS, ROUTES } from "constant";
import { useAuth, useToast } from "context";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router";
import { loginUser } from "libs";
import { useState } from "react";

const LoginForm = () => {
  const { login, user } = useAuth();
  const { showToast } = useToast()
  const navigate = useNavigate();
  const methods = useForm<{ email: string; password: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await loginUser(data);
      console.log(res, 'Login Response');
      console.log(user, 'User Info');
      login(res.token, res.user);
      navigate(ROUTES.HOME);
      showToast("Account Login Successfully", 'success')
    } catch (err) {

      showToast("Invalid username or password. Please try again.", 'error')
      console.log("Login error:", err);
      showToast("Login error:", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack gap={"30px"} justifyContent={"center"} direction={"column"} height={"100%"} maxWidth={400} margin="0 auto">
      <Stack gap={"20px"}>
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Login
        </Typography>
        <Typography variant="body1" sx={{ color: COLORS.gray.light }}>
          Access your Travelwise account
        </Typography>
      </Stack>



      <Stack gap={"20px"}>
        <form onSubmit={methods.handleSubmit(submitData)}>
          <FormProvider {...methods}>
            <Stack gap={"20px"}>
              <CustomTextField
                name="email"
                placeholder="Enter your email"
                label="Email"
                type="email"
              />
              <PasswordField
                name="password"
                label="Password"

              />
            </Stack>

            <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <FormControlLabel
                control={<Checkbox />}
                label="Remember me"
                sx={{ fontSize: "13px" }}
              />
              <Link to={ROUTES.FORGOT_PASSWORDS} style={{ color: COLORS.error.main, fontSize: "13px", textDecoration: "none" }}>
                Forgot Password?
              </Link>
            </Stack>

            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                textTransform: "none",
                py: "12px",
                fontSize: "16px",
                width: "100%",
                mt: 2
              }}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </FormProvider>
        </form>

        <Typography variant="body2" textAlign={"center"}>
          Don't have an account?{" "}
          <Link to={ROUTES.SIGNUP} style={{ color: COLORS.primary.main, textDecoration: "none" }}>
            Sign up
          </Link>
        </Typography>

        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <Divider flexItem sx={{ flexGrow: 1 }} />
          <Typography color={COLORS.gray.main}>or continue with</Typography>
          <Divider flexItem sx={{ flexGrow: 1 }} />
        </Stack>

        <SocialLogin />
      </Stack>
    </Stack>
  );
};

export default LoginForm;