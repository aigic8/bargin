import React from "react"
import Ripples from "react-ripples"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"

const Minimap = () => {
  const schemeSnap = useSnapshot(schemesState)
  const { rippleScheme } = schemeSnap
  const PAGES_COUNT = 30
  
  const btns = new Array(PAGES_COUNT).fill(0).map((_, i) => {
    let btnClass = "minimap__btn"
    const wrapClas = (i <= 7 && i >= 3) ? "minimap__btnWrap --sharp" : "minimap__btnWrap"
    if(i === 3) btnClass += " --rangeStart"
    else if(i < 7 && i > 3) btnClass += " --rangeMiddle"
    else if(i === 7) btnClass += " --rangeEnd"
    else if(i === 1) btnClass += " --island"
    return (
      <div key={i} className={wrapClas}>
        <Ripples color={rippleScheme.normal}>
          <button className={btnClass}>{i + 1}</button>
        </Ripples>
      </div>
    )
  })

  return (
    <div className="minimap">
      <div className="minimap__list" children={btns} />
    </div>
  )
}

export default Minimap