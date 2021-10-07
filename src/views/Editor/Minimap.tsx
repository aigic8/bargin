import React, { useCallback, useRef } from "react"
import { useSnapshot } from "valtio"
import { activeFileState, editorState, InputState, isInSelection, isIsland, pushToSelection, Range } from "../../store/editorStore"
import MinimapBtn, { MinimapBtnType } from "./MinimapBtn"
import MinimapOverlay from "./MinimapOverlay"


const Minimap = () => {
  const activeFileSnap = useSnapshot(activeFileState)
  const editorSnap = useSnapshot(editorState)
  const listRef = useRef<HTMLDivElement>(null)
  const activeFileRef = useRef<InputState>()
  const singleRef = useRef<boolean>()


  const { activeFile } = activeFileSnap
  activeFileRef.current = activeFile
  singleRef.current = editorSnap.overlayState.single
  const PAGES_COUNT = 30

  const onDragStart = useCallback((page: number) => {
    const currFile = activeFileRef.current
    if(!currFile) return
    const range = isInSelection(page, currFile.selection)
    if(!range || !listRef.current) return
    navigator.vibrate(100)
    lockScroll(listRef.current)
    const { scrollTop } = listRef.current
    editorState.overlayState = 
      { scrollTop, range, activePage: page, translate: [0, 0], visible: true, single: false }
  }, [listRef.current, activeFileRef.current])

  const onDrag = useCallback((_page, { offset }: { offset: number[] }) => {
    const single = singleRef.current
    if(offset[0] > 10 && !single) {editorState.overlayState.single = true; singleRef.current = true}
    else if(offset[0] <= 10 && single) {editorState.overlayState.single = false; singleRef.current = false}
    editorState.overlayState.translate = [offset[0], 0]
  }, [singleRef.current])

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
    return (
      <MinimapBtn key={i} {...{type, page, onTap, onDragStart, onDrag, onDragEnd}}/>
    )
  })

  const { visible, ...overlayProps } = editorSnap.overlayState
  return (
    <>
    <div className="minimap">
      <div ref={listRef} className="minimap__list" children={btns} />
    </div>
    { visible && <MinimapOverlay {...overlayProps} /> }
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