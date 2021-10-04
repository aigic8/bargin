import React, { StrictMode } from "react"
import { render } from "react-dom"
import App from "./App"

const AppWrap = () => {
  return (
    <StrictMode>
      <App />
    </StrictMode>
  )
}

render(<AppWrap />, document.getElementById("root"))
