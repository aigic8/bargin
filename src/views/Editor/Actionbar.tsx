import React from "react"
import Ripples from "react-ripples"
import { FlowerLotus, X } from "phosphor-react"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"

const Actionbar = () => {
  const schemesSnap = useSnapshot(schemesState)
  const { rippleScheme, scheme } = schemesSnap

  return (
    <div className="actionbar">
    <Ripples color={rippleScheme.normal}>
      <button className="actionbar__btn">
        <X size={18} weight="light" color={scheme.textColor} />
      </button>
    </Ripples>
    <div className="actionbar__actions">
      <FlowerLotus size={26} weight="thin" color={scheme.textColor} />
    </div>
    <Ripples color={rippleScheme.normal}>
      <button className="actionbar__btn --right">2</button>
    </Ripples>
  </div>
  )
}

export default Actionbar