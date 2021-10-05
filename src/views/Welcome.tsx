import { ArrowRight, Sun } from "phosphor-react"
import React from "react"
import Ripples from "react-ripples"

import EdgeButton from "../assets/EdgeButton"
import PenIMG from "../assets/images/pen.png"
import PenBackgroundIMG from "../assets/images/penBackground.svg"

const Welcome = () => {
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
          <Ripples>
            <button className="glassButton">
              <Sun size={36} color="black" weight="light" className="glassButton__icon" />
            </button>
          </Ripples>
        </div>
        <div className="footer__nextButton" role="button" tabIndex={0}>
          <Ripples color="#FFFFFF22">
            <EdgeButton />
            <ArrowRight size={26} color="white" weight="light" className="footer__nextButtonIcon" />
          </Ripples>
        </div>
      </div>

    </div>
  )
}

export default Welcome