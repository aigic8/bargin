import { proxy } from "valtio";
import { derive } from "valtio/utils"
import colors from "../assets/colors.json"

const { schemes, ripples } = colors

type Theme = "light" | "dark"

const defaultTheme = (): Theme => {
  const userTheme = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ?
  "dark" :
  "light"
  return localStorage.getItem("theme") as Theme ?? userTheme
}

const lightThemeRipples = { normal: ripples.black, background: ripples.lightBackround }
const darkThemeRipples = { normal: ripples.white, background: ripples.darkBackground }

export const appState = proxy({ theme: defaultTheme() })

export const schemesState = derive({
  scheme: get => get(appState).theme === "light" ? schemes.light : schemes.dark,
  rippleScheme: get => get(appState).theme === "light" ? lightThemeRipples : darkThemeRipples,
})
