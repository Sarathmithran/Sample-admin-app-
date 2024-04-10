import { Box } from "@mui/material";
import Navbar from "./components/Navbar/Navbar";

export default function Home() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
      <Navbar/>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h1 style={{paddingTop:'30px'}}>Home</h1>
      </Box>
    </Box>
    </>
  );
}
