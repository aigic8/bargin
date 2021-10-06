import React from "react"
import Ripples from "react-ripples"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"

export type MinimapBtnType = "normal" | "island" | "rangeStart" | "rangeMiddle" | "rangeEnd"

interface MinimapBtnProps {
  page: number
  type: MinimapBtnType
  onTap?: (page: number) => any
}

const MinimapBtn = ({ page, type, onTap }: MinimapBtnProps) => {
  const schemeSnap = useSnapshot(schemesState)

  const { rippleScheme } = schemeSnap
  const btnClass = `minimap__btn --${type}`
  const isSharp = type != "normal" && type != "island"
  const wrapClass = isSharp ? "minimap__btnWrap --sharp" : "minimap__btnWrap"

  return (
    <div className={wrapClass}>
      <Ripples color={rippleScheme.normal}>
        <button className={btnClass} onClick={() => onTap && onTap(page)}>{page}</button>
      </Ripples>
    </div>
  )
}

export default MinimapBtn