import { proxy } from "valtio";
import { derive } from "valtio/utils";

export type SelectionType = "all" | "none" | "custom"

export interface InputState {
  id: string
  selectionType: SelectionType
}


export const inputsState = proxy<{[key: string]: InputState}>({
  "random": {
    id: "random",
    selectionType: "custom"
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