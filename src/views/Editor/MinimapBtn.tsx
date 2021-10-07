import React, { useEffect, useRef } from "react"
import Ripples from "react-ripples"
import { useSnapshot } from "valtio"
import nightWatch from "../../libs/nightWatch"
import { schemesState } from "../../store/appStore"

export type MinimapBtnType = "normal" | "island" | "rangeStart" | "rangeMiddle" | "rangeEnd"
type Handler = (page: number, pos: number[]) => any
type DragHandler = (page: number, args: {pos: number[], offset: number[]}) => any

interface MinimapBtnProps {
  page: number
  type: MinimapBtnType
  onTap?: Handler
  onDragStart?: Handler
  onDrag?: DragHandler
  onDragEnd?: DragHandler
}

const MinimapBtn = ({ page, type, onTap, onDragStart, onDrag, onDragEnd }: MinimapBtnProps) => {
  const schemeSnap = useSnapshot(schemesState)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const clear = nightWatch(btnRef, {
      onTap: (pos) => onTap && onTap(page, pos),
      onDragStart: (pos) => onDragStart && onDragStart(page, pos),
      onDrag: (args) => onDrag && onDrag(page, args),
      onDragEnd: (args) => onDragEnd && onDragEnd(page, args),
    })
    return clear
  }, [])

  const { rippleScheme } = schemeSnap
  const btnClass = `minimap__btn --${type}`
  const isSharp = type != "normal" && type != "island"
  const wrapClass = isSharp ? "minimap__btnWrap --sharp" : "minimap__btnWrap"

  return (
    <div className={wrapClass}>
      <Ripples color={rippleScheme.normal}>
        <button ref={btnRef} className={btnClass}>{page}</button>
      </Ripples>
    </div>
  )
}

export default MinimapBtn