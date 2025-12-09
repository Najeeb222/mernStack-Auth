// import { Button, Stack, Typography, CircularProgress } from "@mui/material";
// import { ArrowBack, CustomTextField, PasswordField } from "components";
// import { COLORS, ROUTES } from "constant";
// import { useToast } from "context";
// import { ResetPassword } from "libs";
// import { FormProvider, useForm } from "react-hook-form";
// import { useNavigate } from "react-router";

// const ChangePasswordForm = () => {
//   const { showToast } = useToast();
//   const method = useForm();
//   const navigate = useNavigate();

//   const submitData = async (data: any) => {
//     try {
//       const payload = {
//         email: data.email,
//         otp: data.otp,
//         newPassword: data.password,
//       };

//       const res = await ResetPassword(payload);
   

//       if (res) {
//         showToast("Password changed successfully", "success");
//         navigate(ROUTES.LOGIN);
//       } else {
//         const errorMessage =
//           res?.message || "Password change failed. Please try again.";
//         showToast(errorMessage, "error");
//       }
//     } catch (error: any) {
//       console.error("Reset password error:", error);
//       showToast(error?.message || "An unexpected error occurred.", "error");
//     }
//   };

//   return (
//     <Stack gap="30px" justifyContent="center" direction="column" height="100%">
//       <ArrowBack />
//       <Stack gap="20px">
//         <Typography variant="h4" sx={{ fontWeight: 600 }}>
//           Set a password
//         </Typography>
//         <Typography
//           variant="caption"
//           sx={{ fontSize: "13px", color: COLORS.gray.light }}
//         >
//           Your previous password has been reset. Please set a new password for
//           your account.
//         </Typography>
//       </Stack>

//       <form onSubmit={method.handleSubmit(submitData)}>
//         <FormProvider {...method}>
//           <Stack gap="20px">
//             <CustomTextField
//               name="email"
//               label="Email"
//               type="email"
//               placeholder="Enter your email"
//             />
//             <CustomTextField
//               type="text"
//               name="otp"
//               label="Enter your OTP"
//               placeholder="Enter the code sent to your email"
//             />
//             <PasswordField name="password" label="New Password" />
//           </Stack>

//           <Button
//             fullWidth
//             type="submit"
//             variant="contained"
//             disabled={method.formState.isSubmitting} 
//             sx={{
//               textTransform: "capitalize",
//               py: "10px",
//               fontSize: "18px",
//               mt: 2,
//             }}
//           >
//             {method.formState.isSubmitting ? (
//               <CircularProgress size={24} color="inherit" />
//             ) : (
//               "Set Password"
//             )}
//           </Button>
//         </FormProvider>
//       </form>
//     </Stack>
//   );
// };

// export default ChangePasswordForm;
