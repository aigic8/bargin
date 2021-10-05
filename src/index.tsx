// It is also declared in tsconfig.json and project's fine
// without it. But vs code doesn't work without it and
// errors out when importing images.
/// <reference path="./index.d.ts" />
import React, { StrictMode } from "react"
import { render } from "react-dom"
import App from "./App"

import "./styles/index.scss"

const AppWrap = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

render(<AppWrap />, document.getElementById("root"))
