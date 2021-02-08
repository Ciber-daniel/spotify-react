import React from "react";
import { RecoilRoot } from "recoil";

import Routes from "./routes";

import { initRecoilState } from "./recoil/utils";
import DebugObserver from "./components/debug-observer";

function App(): JSX.Element {
  return (
    <RecoilRoot initializeState={initRecoilState}>
      <DebugObserver />
      <Routes />
    </RecoilRoot>
  );
}

export default App;
