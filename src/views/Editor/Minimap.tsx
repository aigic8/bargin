import React, { useCallback, useRef, useState } from "react"
import { useSnapshot } from "valtio"
import { activeFileState, editorState, isInSelection, isIsland, pushToSelection, Range } from "../../store/editorStore"
import MinimapBtn, { MinimapBtnType } from "./MinimapBtn"
import MinimapOverlay from "./MinimapOverlay"


const Minimap = () => {
  const activeFileSnap = useSnapshot(activeFileState)
  const editorSnap = useSnapshot(editorState)
  const listRef = useRef<HTMLDivElement>(null)
  const [isOverlaySingle, setIsOverlaySingle] = useState(false)
  const isOverlaySingleRef = useRef<boolean>(false)


  const { activeFile } = activeFileSnap
  const PAGES_COUNT = 30

  const onDragStart = useCallback((page: number) => {
    const range = isInSelection(page, activeFile.selection)
    if(!range || !listRef.current) return
    navigator.vibrate(100)
    lockScroll(listRef.current)
    const { scrollTop } = listRef.current
    editorState.overlayState = { scrollTop, range, activePage: page, translate: [0, 0], visible: true }
  }, [listRef.current, activeFile.selection])

  const onDrag = useCallback((_page, { offset }: { offset: number[] }) => {
    const currState = isOverlaySingleRef.current
    if(offset[0] > 10 && !currState) {setIsOverlaySingle(true); isOverlaySingleRef.current = true}
    if(offset[0] <= 10 && currState) {setIsOverlaySingle(false); isOverlaySingleRef.current = false}
    editorState.overlayState.translate = [offset[0], 0]
  }, [isOverlaySingle, setIsOverlaySingle])

  const onDragEnd = useCallback(() => {
    if(listRef.current) unlockScroll(listRef.current)
    editorState.overlayState.visible = false
  }, [listRef.current])

  if(!activeFile)
    return <></>
  
  const btns = new Array(PAGES_COUNT).fill(0).map((_, i) => {
    const page = i + 1
    const type = makeBtnType(page, editorSnap.tempRangeStart, activeFile.selection)
    const onTap = pushToSelection
    const watchList = [activeFile.selection]
    return (
      <MinimapBtn key={i} {...{type, page, onTap, onDragStart, onDrag, onDragEnd, watchList}}/>
    )
  })

  const { visible, ...overlayProps } = editorSnap.overlayState
  return (
    <>
    <div className="minimap">
      <div ref={listRef} className="minimap__list" children={btns} />
    </div>
    { visible && <MinimapOverlay {...overlayProps} single={isOverlaySingle} /> }
    </>
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

const unlockScroll = (el: HTMLElement) => {
  el.style.overflow = "scroll"
}

const lockScroll = (el: HTMLElement) => {
  const top = el.scrollTop
  el.style.overflow = "hidden"
  el.scrollTo({ top })
}