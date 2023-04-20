import { Grid } from "@mui/material";
import Navbar from "./components/NavBar";
import { Box, height } from "@mui/system";

export default function App() {
  return (
    <>
      <Navbar />
      <Grid
        container
        rowSpacing={10}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        alignItems="stretch"
      >
        <Grid item xl={6} xs={6}>
          <Box
            flexGrow={1}
            bgcolor={"red"}
            sx={{
              height: "calc(100% - 200px)",
              width: "100%",
            }}
          >
            AAA
          </Box>
        </Grid>
        <Grid item xl={6} xs={6}>
          <Box>bb</Box>
        </Grid>
      </Grid>
    </>
  );
}
