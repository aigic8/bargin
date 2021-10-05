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
    selection: [[1,7], [9, 9], [15, 17]],
  }
})

export const activeIdState = proxy({activeId: "random"})

export const activeFileState = derive({
  activeFile: get => get(inputsState)[get(activeIdState).activeId]
})

const toggleSelectionMap = {none: "all", all: "custom", custom: "none"} as {[key: string]: SelectionType}
export const toggleActiveSelectionType = function() {
  if (!inputsState[activeIdState.activeId]) return
  const currSelectionType = inputsState[activeIdState.activeId].selectionType
  inputsState[activeIdState.activeId].selectionType = toggleSelectionMap[currSelectionType]
}

export const isInRange = (page: number, range: Range) =>
    range[0] <= page && range[1] >= page

export const isInSelection = (page: number, selection: Range[]) =>
  selection.find(range => isInRange(page, range))

export const isIsland = (range: Range) =>
  range[0] === range[1]