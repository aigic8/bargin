import React, { useCallback } from "react"
import Ripples from "react-ripples"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"
import { activeFileState, editorState, isInSelection, isIsland, pushToSelection, Range } from "../../store/editorStore"

type MinimapBtnType = "normal" | "island" | "rangeStart" | "rangeMiddle" | "rangeEnd"

const Minimap = () => {
  const schemeSnap = useSnapshot(schemesState)
  const activeFileSnap = useSnapshot(activeFileState)
  const editorSnap = useSnapshot(editorState)

  const { activeFile } = activeFileSnap
  const { rippleScheme } = schemeSnap
  const PAGES_COUNT = 30

  if(!activeFile)
    return <></>
  
  const btns = new Array(PAGES_COUNT).fill(0).map((_, i) => {
    const page = i + 1
    const btnType = makeBtnType(page, editorSnap.tempRangeStart, activeFile.selection)
    const btnClass = `minimap__btn --${btnType}`
    const wrapClass = (btnType != "normal" && btnType != "island")? 
      "minimap__btnWrap --sharp" : "minimap__btnWrap"
    return (
      <div key={i} className={wrapClass}>
        <Ripples color={rippleScheme.normal}>
          <button className={btnClass} onClick={() => pushToSelection(page)}>{page}</button>
        </Ripples>
      </div>
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