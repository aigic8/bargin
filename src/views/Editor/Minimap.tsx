import React from "react"
import { useSnapshot } from "valtio"
import { activeFileState, editorState, isInSelection, isIsland, pushToSelection, Range } from "../../store/editorStore"
import MinimapBtn, { MinimapBtnType } from "./MinimapBtn"


const Minimap = () => {
  const activeFileSnap = useSnapshot(activeFileState)
  const editorSnap = useSnapshot(editorState)

  const { activeFile } = activeFileSnap
  const PAGES_COUNT = 30

  if(!activeFile)
    return <></>
  
  const btns = new Array(PAGES_COUNT).fill(0).map((_, i) => {
    const page = i + 1
    const btnType = makeBtnType(page, editorSnap.tempRangeStart, activeFile.selection)
    return (
      <MinimapBtn key={i} type={btnType} page={page} onTap={pushToSelection}/>
    )
  })

  return (
    <div className="minimap">
      <div className="minimap__list" children={btns} />
    </div>
  )
}

export default Minimap

const makeBtnType = (page: number, tempRangeStart: number, selection: Range[]): MinimapBtnType => {
  if(tempRangeStart === page) return "rangeStart"
  const range = isInSelection(page, selection)
  if(!range) return "normal"
  if(isIsland(range)) return "island"
  if(range[0] === page) return "rangeStart"
  if(range[1] === page) return "rangeEnd"
  return "rangeMiddle"
}