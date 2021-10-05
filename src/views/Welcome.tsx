import React from "react"
import Ripples from "react-ripples"
import { ArrowRight, Moon, Sun } from "phosphor-react"
import { useSnapshot } from "valtio"
import { appState, schemesState } from "../store/appStore"

import EdgeButton from "../assets/EdgeButton"
import PenIMG from "../assets/images/pen.png"
import PenBackgroundIMG from "../assets/images/penBackground.svg"

const Welcome = () => {
  const themeSnap = useSnapshot(appState)
  const schemesSnap = useSnapshot(schemesState)

  const { rippleScheme, scheme } = schemesSnap
  const changeThemeBtnIcon = themeSnap.theme === "light" ?
    <Sun size={36} color={scheme.textColor} weight="light" className="glassButton__icon" />:
    <Moon size={36} color={scheme.textColor} weight="light" className="glassButton__icon"/>
  
  return (
    <div className="container">

      <header className="header">
        <div className="header__title">Bargin<span className="--colorGold">.</span></div>
        <div className="header__slogan">PDF EDITING DONE CLEAN!</div>
      </header>

      <div className="penPart">
        <img src={PenBackgroundIMG} alt="pen background" className="penPart__background" tabIndex={-1}/>
        <img src={PenIMG} alt="gold and black pen" className="penPart__pen" />
      </div>

      <div className="footer">
        <div className="roundWrap">
          <Ripples color={rippleScheme.normal}>
            <button className="glassButton">
              { changeThemeBtnIcon }
            </button>
          </Ripples>
        </div>
        <div className="footer__nextButton" role="button" tabIndex={0}>
          <Ripples color={rippleScheme.background}>
            <EdgeButton />
            <ArrowRight size={26} color={scheme.backgroundColor} weight="light" className="footer__nextButtonIcon" />
          </Ripples>
        </div>
      </div>

    </div>
  )
}

export default Welcome