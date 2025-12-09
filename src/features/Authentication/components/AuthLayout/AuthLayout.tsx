import { Container, Grid, Paper } from "@mui/material";
import { AuthSlider } from "..";
import { motion } from "framer-motion";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Container
            maxWidth="md"
            disableGutters
            sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: { sm: '110vh' ,xs:'100%'},
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                style={{ width: "100%" }}
            >
                <Grid
                    container
                    spacing={3}
                    component={Paper}
                    elevation={3}
                    sx={{
                        p: 3,
                        my: "auto",
                        borderRadius: "30px",
                        overflow: "hidden",
                    }}
                >
                    <Grid
                        size={{ xs: 12, sm: 7 }}
                        order={{ xs: 2, sm: 1 }}
                        component={motion.div}
                        initial={{ x: -40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                          sx={{ height: '100%',
                         mt: { xs: 2, sm: 0 },
                           }} 
                    >
                        {children}
                    </Grid>

                    <Grid
                        size={{ xs: 12, sm: 5 }}
                        order={{ xs: 1, sm: 2 }}
                        component={motion.div}
                        initial={{ x: 40, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        sx={{
                         
                        
                            height:'100%'}}
                    >
                        <AuthSlider />
                    </Grid>
                </Grid>
            </motion.div>
        </Container>
    );
};

export default AuthLayout;
