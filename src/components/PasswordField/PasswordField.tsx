import React, { useState, useCallback } from "react";
import { Controller, useFormContext } from "react-hook-form";
import {
    Box,
    Stack,
    TextField,
    InputLabel,
    IconButton,
    Typography,
    InputAdornment,
} from "@mui/material";
import {
    Info,
    LockOutline,
    VisibilityOff,
    VisibilityOutlined,
} from "@mui/icons-material";
import { COLORS } from "constant"; // adjust this import based on your project

interface PasswordFieldProps {
    name: string;
    label?: string;
    disabled?: boolean;
    maxLength?: number;
    readOnly?: boolean;
    description?: string;
    placeholder?: string;
    defaultValue?: string;
    autoComplete?: string;
    width?: string | number;
    height?: string | number;
    showHelperText?: boolean;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
    name,
    label,
    height,
    maxLength,
    description,
    placeholder,
    width = "100%",
    disabled = false,
    readOnly = false,
    defaultValue = "",
    autoComplete = "off",
    showHelperText = true,
}) => {
    const { control } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const renderHelperText = (errorMessage?: string) => {
        if (!showHelperText || !errorMessage) return "";
        return (
            <Typography
                component="span"
                variant="caption"
                sx={{
                    display: "flex",
                    marginLeft: -2,
                    alignItems: "center",
                    textTransform: "none",
                    color: COLORS.error.main,
                }}
            >
                <InputAdornment position="start">
                    <Info sx={{ color: COLORS.error.main, rotate: "180deg", width: 16 }} />
                </InputAdornment>
                {errorMessage}
            </Typography>
        );
    };

    return (
        <Box width={width}>

            {/* <Stack direction="column" gap={"4px"} > */}


                {/* {label && (
                    <Typography
                        // variant="h2_bold"
                        component={InputLabel}
                        sx={{ color: COLORS.gray.dark }}
                    >
                        {label}
                    </Typography>
                )} */}
                {/* {description && (
                    <Typography mb={1}>
                        {description}
                    </Typography>
                )} */}
            {/* </Stack> */}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        type={showPassword ? "text" : "password"}
                        fullWidth
                        variant="outlined"
                        label={label}
                        placeholder={placeholder || ""}
                        disabled={disabled}
                        error={!!fieldState.error}
                        helperText={renderHelperText(fieldState.error?.message)}
                        inputProps={{
                            maxLength,
                            readOnly,
                        }}
                        sx={{
                            // borderRadius: '100px',

                            "& .MuiInputBase-root": {
                                height: height || "inherit",
                                // borderRadius: '32px',
                                bgcolor: 'transparent',

                            },
                        }}
                        InputProps={{
                            // startAdornment: (
                            //     <InputAdornment position="start">
                            //         <LockOutline sx={{ color: COLORS.gray.light }} />
                            //     </InputAdornment>
                            // ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={togglePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? (
                                            <VisibilityOff sx={{ color: COLORS.gray.light }} />
                                        ) : (
                                            <VisibilityOutlined sx={{ color: COLORS.gray.light }} />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                            autoComplete,
                        }}
                    />
                )}
            />
        </Box>
    );
};

export default PasswordField;
