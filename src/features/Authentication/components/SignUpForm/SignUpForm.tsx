import { useState } from "react";
import {
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import { CustomTextField, PasswordField, SocialLogin } from "components";
import { COLORS, ROUTES } from "constant";
import { useToast } from "context";
import { registerUser } from "libs";
import { FormProvider, useForm, Controller } from "react-hook-form";
import { Link, useNavigate } from "react-router";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  // confirmPassword: string;
  acceptTerms: boolean;
}

const SignUpForm = () => {
  const { showToast } = useToast();
  const methods = useForm<SignUpFormData>({
    defaultValues: {
      acceptTerms: false
    }
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const submitData = async (data: SignUpFormData) => {
    if (!data.acceptTerms) {
      showToast("You must agree to the terms before continuing.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      const res = await registerUser(payload);
      console.log("API Response:", res.token);

      if (res) {
        showToast("Account created successfully!", "success");
        navigate(ROUTES.HOME);
      } else {
        const errorMessage = res.message || "Sign up failed. Please try again.";
        showToast(errorMessage, "error");
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      showToast(error?.message || "An unexpected error occurred.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack
      gap={"30px"}
      justifyContent={"center"}
      direction={"column"}
      height={"100%"}
      maxWidth={500}
      margin="0 auto"
      p={2}
    >
      <Stack gap={"20px"} textAlign="center">
        <Typography variant="h4" sx={{ fontWeight: 600 }}>
          Create Account
        </Typography>
        <Typography variant="body1" sx={{ color: COLORS.gray.light }}>
          Let's get you set up to access your personal account
        </Typography>
      </Stack>

      <form onSubmit={methods.handleSubmit(submitData)}>
        <FormProvider {...methods}>
          <Grid container spacing={2}>
            <Grid size={12}>
              <CustomTextField
                name="name"
                placeholder="Enter your name"
                type="text"
                label="Name"
              />
            </Grid>

            <Grid size={12}>
              <CustomTextField
                name="email"
                placeholder="Enter your email"
                type="email"
                label="Email"
              />
            </Grid>

            <Grid size={12}>
              <PasswordField
                name="password"
                label="Password"
                placeholder="Create a password (min 6 characters)"
              />
            </Grid>
          </Grid>

          {/* Terms Checkbox */}
          <Controller
            name="acceptTerms"
            control={methods.control}
            rules={{ required: "You must accept the terms" }}
            render={({ field, fieldState }) => (
              <>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      size="small"
                      sx={{ p: 0.5, mr: 1 }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      By creating an account, you agree to our{" "}
                      <Link
                        to={ROUTES.SIGNUP}
                        style={{
                          color: COLORS.primary.main,
                          textDecoration: "underline",
                        }}
                      >
                        Terms
                      </Link>{" "}
                      and{" "}
                      <Link
                        to={ROUTES.SIGNUP}
                        style={{
                          color: COLORS.primary.main,
                          textDecoration: "underline",
                        }}
                      >
                        Privacy Policy
                      </Link>
                    </Typography>
                  }
                  sx={{ alignItems: "flex-start", mt: 2 }}
                />
                {fieldState.error && (
                  <Typography variant="caption" color="error">
                    {fieldState.error.message}
                  </Typography>
                )}
              </>
            )}
          />

          <Button
            type="submit"
            variant="contained"
            disabled={isLoading}
            fullWidth
            sx={{
              mt: 3,
              py: 2,
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </FormProvider>
      </form>

      <Typography variant="body2" textAlign={"center"}>
        Already have an account?{" "}
        <Link
          to={ROUTES.LOGIN}
          style={{
            color: COLORS.primary.main,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Log in
        </Link>
      </Typography>

      <Stack direction={"row"} alignItems={"center"} gap={2} sx={{ my: 2 }}>
        <Divider flexItem sx={{ flexGrow: 1 }} />
        <Typography color={COLORS.gray.main}>or continue with</Typography>
        <Divider flexItem sx={{ flexGrow: 1 }} />
      </Stack>

      <SocialLogin />
    </Stack>
  );
};

export default SignUpForm;
