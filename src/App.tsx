import React from "react";
import { RecoilRoot } from "recoil";

import Routes from "./routes";

import { initRecoilState } from "./recoil/utils";

function App(): JSX.Element {
  return (
    <RecoilRoot initializeState={initRecoilState}>
      <Routes />
    </RecoilRoot>
  );
}

export default App;
