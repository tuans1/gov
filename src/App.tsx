import { Grid } from "@mui/material";
import Navbar from "./components/NavBar";
import { Box, height } from "@mui/system";

export default function App() {
  return (
    <>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Navbar />
        <Grid
          container
          // rowSpacing={10}
          // columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          height={"calc(100vh - 100.5px)"}
        >
          <Grid item xl={3} xs={3} bgcolor={"red"}>
            AAAA
          </Grid>
          <Grid item xl={6} xs={6} bgcolor={"green"} width={"100%"}>
            bbbbb
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
