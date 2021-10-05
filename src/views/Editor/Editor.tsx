import React from "react"
import Actionbar from "./Actionbar"
import Tabbar from "./Tabbar"

const Editor = () => {
  return (
    <div className="container">
      <div className="docviewer">No Document to show. </div>
      <Actionbar />
      <Tabbar />
    </div>
  )
}

export default Editor