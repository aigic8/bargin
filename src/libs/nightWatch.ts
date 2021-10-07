import Hammer from "hammerjs"
import { RefObject } from "react"

type Handler = (pos: number[]) => any
type DragHandler = (args: { pos: number[], offset: number[] }) => any

interface WatchOptions {
  onTap?: Handler,
  onDragStart?: Handler,
  onDrag?: DragHandler,
  onDragEnd?: DragHandler
}

const nightWatch = (ref: RefObject<HTMLElement>, options: WatchOptions) => {
  let isDragging = false
  const { onTap, onDrag, onDragStart, onDragEnd } = options

  if(!ref.current) return () => {}

  const hammer = new Hammer(ref.current)
  hammer.get("tap").set({ time: 500 })
  hammer.get("press").set({ time: 501 })

  hammer.on("tap", ev => {
    console.log("TAP")
    isDragging = false
    onTap && onTap([ev.center.x, ev.center.y])
  })

  hammer.on("press", ev => {
    console.log("ONPRESS")
    isDragging = true
    onDragStart && onDragStart([ev.center.x, ev.center.y])
  })

  hammer.on("pan", ev => {
    console.log("ONPAN")
    if(!isDragging) return
    const pos = [ev.center.x, ev.center.y]
    const offset = [ev.deltaX, ev.deltaY]
    onDrag && onDrag({ offset, pos })
  })

  hammer.on("panend", ev => {
    console.log("PANEND")
    if(!isDragging) return
    isDragging = false
    const pos = [ev.center.x, ev.center.y]
    const offset = [ev.deltaX, ev.deltaY]
    onDragEnd && onDragEnd({ offset, pos })
  })

  hammer.on("pressup", ev => {
    console.log("PRESSUP")
    if(!isDragging) return
    isDragging = false
    const pos = [ev.center.x, ev.center.y]
    onDragEnd && onDragEnd({ offset: [0, 0], pos })
  })

  return () => {console.log("REFRESH"); hammer.stop(true); hammer.destroy(); isDragging = false;}
}

export default nightWatch