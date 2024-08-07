export enum LayerState {
  NONE = 0,
  TEXT = 1,
  LOGO = 2
}

export enum WebbingFonts {
  sansSerif = 1,
  timesNewRoman = 2
}

export interface WebbingLayer {
  // General
  id: string,
  hspace: number,
  vspace: number,
  size: number,
  rowoff: number,
  bgColor: string,

  state: LayerState,

  // For logo
  img: string,

  // For text
  text: string,
  font: WebbingFonts,
  fontColor: string,
  bold: boolean
}

export const emptyWebbingState: WebbingState = {
  name: "My Design",
  angle: 0,
  layers: []
}

export default interface WebbingState {
  name: string,
  angle: number,
  layers: WebbingLayer[]
}