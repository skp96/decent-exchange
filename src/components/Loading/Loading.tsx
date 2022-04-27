import { CircularProgress, Box } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color={"primary"} />
    </Box>
  );
};
