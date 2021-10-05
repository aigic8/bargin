import React from "react"
import Actionbar from "./Actionbar"
import Minimap from "./Minimap"
import Tabbar from "./Tabbar"

const Editor = () => {
  return (
    <div className="container">
      <div className="docviewer">No Document to show. </div>
      <Minimap />
      <Actionbar />
      <Tabbar />
    </div>
  )
}

export default Editor