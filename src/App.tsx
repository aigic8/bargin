import React, { useEffect } from "react"
import { useSnapshot } from "valtio"
import { appState, schemesState } from "./store/appStore"
import Welcome from "./views/Welcome"

const App = () => {
  const schemeSnap = useSnapshot(schemesState)
  const appSnap = useSnapshot(appState)
  const { scheme } = schemeSnap
  const { theme } = appSnap

  useEffect(() => {
    for (const [prop, value] of Object.entries(scheme))
      document.body.style.setProperty(`--${prop}`, value)

    if(theme === "dark") document.body.classList.add("--dark")
    else document.body.classList.remove("--dark")
  }, [scheme, theme])
  return <Welcome />
}

export default App