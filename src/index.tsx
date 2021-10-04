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
