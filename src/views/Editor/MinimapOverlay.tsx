import React, { useMemo } from "react"
import { Range } from "../../store/editorStore"

interface MinimapOverlayProps {
  range: Range
  activePage: number
  scrollTop: number
  translate: number[]
}

const SIZE = 40

const MinimapOverlay = ({ range, activePage, scrollTop, translate: t } : MinimapOverlayProps) => {
  const count = range[1] - range[0] + 1
  const rangeTop = (range[0] - 1) * SIZE - scrollTop
  const rangeHeight = count * SIZE
  const rangeItems = useMemo(() => {
    return new Array(count).fill(0).map((_, i) => {
      return <div key={i} className="minimapOverlay__item">{i + range[0]}</div>
    })
  },[range])

  const itemTop = (activePage - 1) * SIZE - scrollTop
  const itemHeight = SIZE

  return (
    <div className="minimapOverlay" style={{ transform: `translate(${t[0]}px, ${t[1]}px)` }}>
      <div className="minimapOverlay__group" style={{ height: rangeHeight, top: rangeTop }}>
        { rangeItems }
      </div>
      <div className="minimapOverlay__group" style={{ height: itemHeight, top: itemTop }}>
        <div className="minimapOverlay__item">{ activePage }</div>
      </div>
    </div>
  )
}

export default MinimapOverlay