import React from "react"
import Ripples from "react-ripples"
import { useSnapshot } from "valtio"
import { schemesState } from "../../store/appStore"
import colors from "../../assets/colors.json"

const Tabbar = () => {
  const schemesSnap = useSnapshot(schemesState)
  const { rippleScheme } = schemesSnap

  const btns = new Array(10).fill(0).map((_, i) => {
    const btnClass = i === 3 ? "tabbar__btn --active" : "tabbar__btn"
    return (
      <div key={i} className="roundWrap">
        <Ripples color={rippleScheme.normal}>
          <button className={btnClass}>{i + 1}</button>
        </Ripples>
      </div>
    )
  })

  return (
    <>
      <div className="tabbarBorder"></div>
      <div className="tabbar">
        <div className="tabbar__btns" children={btns} />
        <Ripples color={colors.ripples.white}>
          <button className="tabbar__mainBtn">Export</button>
        </Ripples>
      </div>

      { /* Path for clipping tabbar */}
      <svg height="0" width="0">
        <defs>
          <clipPath id="tabbarClipper" clipPathUnits="objectBoundingBox">
            <path d="M0 0V1H1V0C1 0.131496 0.98366 0.238095 0.963504 0.238095H0.0364963C0.01634 0.238095 0 0.131496 0 0Z" fill="black" />
          </clipPath>
        </defs>
      </svg>
    </>
  )
}

export default Tabbar