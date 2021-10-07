import { proxy } from "valtio";
import { derive } from "valtio/utils";

export type SelectionType = "all" | "none" | "custom"
export type Range = number[]

export interface InputState {
  id: string
  selectionType: SelectionType
  selection: Range[]
}


export const inputsState = proxy<{[key: string]: InputState}>({
  "random": {
    id: "random",
    selectionType: "custom",
    selection: [],
  }
})


export const editorState = proxy({
  activeId: "random",
  tempRangeStart: -1,
  overlayState: {
    visible: false,
    scrollTop: 0,
    activePage: -1,
    range: [0,0] as Range,
    translate: [] as number[],
    single: false,
  }
})

export const activeFileState = derive({
  activeFile: get => get(inputsState)[get(editorState).activeId]
})

export const isInRange = (page: number, range: Range) =>
    range[0] <= page && range[1] >= page

export const isInSelection = (page: number, selection: Range[]) =>
  selection.find(range => isInRange(page, range))

export const isIsland = (range: Range) =>
  range[0] === range[1]


const toggleSelectionMap = {none: "all", all: "custom", custom: "none"} as {[key: string]: SelectionType}
export const toggleActiveSelectionType = function() {
  if (!inputsState[editorState.activeId]) return
  const currSelectionType = inputsState[editorState.activeId].selectionType
  inputsState[editorState.activeId].selectionType = toggleSelectionMap[currSelectionType]
}

export const popFromSelection = (pRangeOverflow: Range) => {
  if(!activeFileState.activeFile) return
  const range = isInSelection(pRangeOverflow[0], activeFileState.activeFile.selection)
  if(!range) return
  const pRange = strictRangeIn(pRangeOverflow, range[0], range[1]) // Solve possible bug of overflow in range
  const pRangeCount = pRange[1] - pRange[0]
  const rangeCount = range[1] - range[0]
  const i = activeFileState.activeFile.selection.findIndex((curr) => isInRange(range[0], curr))

  if(pRangeCount === rangeCount) {
    inputsState[editorState.activeId].selection.splice(i, 1)
  } else if (pRange[0] === range[0]) {
    inputsState[editorState.activeId].selection[i] = [pRange[1] + 1, range[1]]
  } else if (pRange[1] === range[1]) {
    inputsState[editorState.activeId].selection[i] = [range[0], pRange[0] - 1]
  } else {
    const firstPart = [range[0], pRange[0] - 1]
    const secondPart = [pRange[1] + 1, range[1]]
    inputsState[editorState.activeId].selection[i] = firstPart
    inputsState[editorState.activeId].selection.push(secondPart)
  }
}

const strictRangeIn = (range: Range, start: number, end: number) => {
  return [Math.max(range[0], start), Math.min(range[1], end)]
} 

export const pushToSelection = (page: number) => {
  const { tempRangeStart } = editorState
  const activeSelection = activeFileState.activeFile.selection
  if(tempRangeStart === page) {
    editorState.tempRangeStart = -1
    return
  }
  if(tempRangeStart != -1) {
    const range = [Math.min(tempRangeStart, page), Math.max(tempRangeStart, page)]
    inputsState[editorState.activeId].selection = makeRange(range, activeSelection)
    editorState.tempRangeStart = -1
    return
  }
  const motherRange = isInSelection(page, activeSelection)
  if(!motherRange) {
    inputsState[editorState.activeId].selection.push([page, page])
  } else if(isIsland(motherRange)) {
    const i = inputsState[editorState.activeId].selection.findIndex(range => isInRange(page, range))
    inputsState[editorState.activeId].selection.splice(i, 1)
    editorState.tempRangeStart = page
  }
}

const makeRange = (range: Range, selection: Range[]) => {
  let result = [...selection]
  let [ from, to ] = range
  let mergableRanges = findMergableRanges(range, result)
  while(mergableRanges.length != 0) {
    mergableRanges.push(range)
    result = result.filter((currRange) => !isMergable(currRange, [from, to]))
    from = arrMin(mergableRanges.map(range => range[0]))
    to = arrMax(mergableRanges.map(range => range[1]))
    mergableRanges = findMergableRanges([from, to ], result)
  }
  result.push([from, to ])
  return result
}

const findMergableRanges = (range: Range, selection: Range[]) =>
  selection.filter((currRange) => isMergable(currRange, range))

const isMergable = (r1: Range, r2: Range) =>
  (r1[1] >= (r2[0] - 1) && r1[1] <= (r2[1] + 1)) ||
  (r1[0] >= (r2[0] - 1) && r1[0] <= (r2[1] + 1))

const arrMin = (arr: number[]) => arr.reduce((prev, curr) => Math.min(prev, curr), arr[0])
const arrMax = (arr: number[]) => arr.reduce((prev, curr) => Math.max(prev, curr), arr[0])