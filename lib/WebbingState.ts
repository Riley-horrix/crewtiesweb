/**
 * @file WebbingState.ts
 * @author Riley Horrix (riley@horrix.com)
 * @brief Webbing state interfaces and utils.
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

/**
 * A collection of the possible states of the webbing.
 */
export enum LayerState {
  NONE = 0,
  TEXT = 1,
  LOGO = 2
}

/**
 * A collection of all the available fonts.
 * @member sansSerif
 * @member timesNewRoman
 */
export enum WebbingFonts {
  arial = 0,
  timesNewRoman = 1
}

export function fontEnumToString(e: WebbingFonts) {
  switch (e) {
    case WebbingFonts.arial:
      return "Arial";

    case WebbingFonts.timesNewRoman:
      return "Times New Roman"
  }
}

/**
 * Interface to represent a single layer of the webbing design.
 * @member id A unique string id for the layer.
 * @member hspace Amount of horizontal spacing between components.
 * @member vspace Amount of vertical spacing between components.
 * @member size The size of the component. For images this is width and for text this is font size.
 * @member rowoff The number of layers it takes for the pattern to repeat vertically.
 * @member bgColor The colour of this layer's background in a hex string.
 * @member state The LayerState of this layer, representing whether it uses text, image or none.
 * @member img The base64 string representation of the logo or image.
 * @member text The text string used on the design.
 * @member font The WebbingFont enum used to select a font type for the webbing text.
 * @member fontColor The color of the font in a hex string.
 * @member bold A bool to represent whether the text on the strap is bold.
 */
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

// An empty WebbingState object
export const emptyWebbingState: WebbingState = {
  name: "My Design",
  angle: 0,
  layers: []
}

/**
 * Interface for the highest level WebbingState object.
 * @member name A string name for the webbing design.
 * @member angle A number for the amount of rotation (degrees) of the design.
 * @member layers An array of WebbingLayer objects to represent the layers.
 */
export default interface WebbingState {
  name: string,
  angle: number,
  layers: WebbingLayer[]
}