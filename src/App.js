import Navbar from "./components/NavBar";
import { Box } from "@mui/system";

import FormInput from "./pages/form/FormInput";
import ListPdfFile from "./pages/listPdf/ListPdfFile";
export default function App() {
  return (
    <>
      <Box
        height={"calc(100vh - 100.5px)"}
      >
        <Navbar />
        {/* <FormInput /> */}
        <ListPdfFile />
      </Box>
    </>
  );
}
