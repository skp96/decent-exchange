import "./App.css";
import { RecoilRoot } from "recoil";
import { Suspense } from "react";
import { Loading } from "./components/Loading/Loading";
import { HomeContainer } from "./components/Home/HomeContainer";
import { theme } from "./components/styles";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Suspense fallback={<Loading />}>
          <HomeContainer />
        </Suspense>
      </ThemeProvider>
    </RecoilRoot>
  );
}

export default App;
