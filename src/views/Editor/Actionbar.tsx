import React, { useMemo } from "react"
import Ripples from "react-ripples"
import Minimap from "./Minimap"
import { Asterisk, Check, FlowerLotus, X } from "phosphor-react"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"
import { activeFileState, SelectionType, toggleActiveSelectionType } from "../../store/editorStore"
import colors from "../../assets/colors.json"

const Actionbar = () => {
  const schemesSnap = useSnapshot(schemesState)
  const activeFileSnap = useSnapshot(activeFileState)

  const { rippleScheme, scheme } = schemesSnap
  const { activeFile } = activeFileSnap

  const sType: SelectionType = activeFile?.selectionType ?? "none"
  const selectionBtnClass = sType === "none" ? "actionbar__btn" : "actionbar__btn --active"
  const selectionBtnRipple = sType === "none" ? rippleScheme.normal : colors.ripples.white
  const selectionBtnIcons = useMemo(() => ({
    none: <X size={18} weight="light" color={scheme.textColor} />,
    all: <Check size={18} weight="light" color="white" />,
    custom: <Asterisk size={18} weight="light" color="white" />
  }), [scheme.textColor])

  return (
    <>
      {sType === "custom" && <Minimap />}
      <div className="actionbar">
        <Ripples color={selectionBtnRipple}>
          <button className={selectionBtnClass} onClick={toggleActiveSelectionType}>
            {selectionBtnIcons[sType]}
          </button>
        </Ripples>
        <div className="actionbar__actions">
          <FlowerLotus size={26} weight="thin" color={scheme.textColor} />
        </div>
        <Ripples color={rippleScheme.normal}>
          <button className="actionbar__btn --right">2</button>
        </Ripples>
      </div>
    </>
  )
}

export default Actionbar