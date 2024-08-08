/**
 * @file Webbing.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Webbing component for design
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import WebbingState, { fontEnumToString, LayerState, WebbingLayer } from "@/lib/WebbingState";

import styles from "./Webbing.module.css";

interface Props {
  state: WebbingState
}

import { useEffect, useState } from "react";

import p5 from "p5";
import React from "react";

// Font size and type must have already been set to call this function.
const layerHeight: (arg0: WebbingLayer, arg1: p5, arg2: p5.Image) => number = (layer: WebbingLayer, sketch: p5, image: p5.Image) => {

  // Make this dependent on font used in future
  const MAGIC = 0.9;

  switch (layer.state) {
    case LayerState.NONE:
      return layer.size + layer.hspace * 2;

    case LayerState.LOGO:
      return layer.hspace * 2 + image.height;

    case LayerState.TEXT:
      return (sketch.textAscent() + sketch.textDescent()) * MAGIC;
  }
  return 0;
}

/**
 * The webbing display component.
 * @param state The WebbingState object
 * @returns 
 */
export default function Webbing({ state }: Props) {
  const displayW = 120;
  const displayH = 600;

  const maxWH = Math.max(displayH, displayW);

  // const p5 = require("p5");
  const [webbingSketch, setWebbingSketch] = useState<p5>();

  useEffect(() => {
    const thisSketch = (sketch: p5) => {
      const imgMap: Map<string, p5.Image> = new Map();

      sketch.setup = () => {
        sketch.createCanvas(displayW, displayH);
        sketch.translate(displayW / 2, displayH / 2);
        sketch.angleMode(sketch.DEGREES);
        sketch.rectMode(sketch.CORNER);
        console.log("done")
        sketch.noLoop();
      }

      const calcWidth: (arg0: WebbingLayer) => number = (layer) => {
        switch (layer.state) {
          case LayerState.NONE:
            return Infinity;

          case LayerState.TEXT:
            sketch.textFont(fontEnumToString(layer.font));
            sketch.textSize(layer.size);
            return sketch.textWidth(layer.text) + layer.hspace * 2;

          case LayerState.LOGO:
            // TODO move to common function
            var img = imgMap.get(layer.id);
            if (img === undefined) {
              img = sketch.loadImage(layer.img);
              imgMap.set(layer.id, img);
            }
            return layer.size + layer.hspace * 2;
        }
      }

      const calcHeight: (arg0: WebbingLayer) => number = (layer) => {
        switch (layer.state) {
          case LayerState.NONE:
            return layer.size + layer.vspace * 2;

          case LayerState.TEXT:
            // TODO : Make this dependent on text in future
            const MAGIC = 0.8;
            sketch.textFont(fontEnumToString(layer.font));
            sketch.textSize(layer.size);
            return (sketch.textAscent() + sketch.textDescent()) * MAGIC + layer.vspace * 2;

          case LayerState.LOGO:
            var img = imgMap.get(layer.id);
            if (img === undefined) {
              img = sketch.loadImage(layer.img);
              imgMap.set(layer.id, img);
            }
            return getImgDimensions(img, layer.size)[1] + layer.vspace * 2;
        }
      }

      /**
       * Get the correct image dimensions from img and size.
       * @param img The Image
       * @param size The size of the image
       * @returns [width, height] of the new image
       */
      const getImgDimensions = (img: p5.Image, size: number) => {
        return [size, size * img.height / img.width];
      }

      const drawLayer = (layer: WebbingLayer, x: number, y: number) => {
        switch (layer.state) {
          case LayerState.NONE:
            return;

          case LayerState.TEXT:
            sketch.textFont(fontEnumToString(layer.font));
            sketch.textSize(layer.size);
            sketch.fill(layer.fontColor);
            if (layer.bold) {
              sketch.textStyle(sketch.BOLD);
            }
            sketch.text(layer.text, x, y);
            return;

          case LayerState.LOGO:
            const img = imgMap.get(layer.id);
            if (img) {
              const [width, height] = getImgDimensions(img, layer.size);
              sketch.image(img, x, y, width, height)
            }
        }
      }

      sketch.draw = () => {
        var totalHeight = 0;

        // Calculate total height of all layers and populate images.
        state.layers.forEach((elem) => {
          totalHeight += calcHeight(elem);
        })

        sketch.rotate(state.angle);

        var index = 0;
        for (var y = -maxWH; y <= maxWH; y += totalHeight) {
          var yoff = 0;
          console.log("done")
          // Draw each layer
          state.layers.forEach((layer) => {
            const thisHeight = calcHeight(layer);

            // Draw background rectangle
            sketch.fill(layer.bgColor);
            sketch.strokeWeight(0);
            sketch.rect(-maxWH, y + yoff, 2 * maxWH, thisHeight);

            // If no other decoration then return
            if (layer.state == LayerState.NONE) {
              yoff += thisHeight;
              return;
            }

            // Width of each element
            const hOffset = calcWidth(layer);

            // Offset from the last row of the same layer
            const rowOffset = layer.rowoff <= 1 ? hOffset : hOffset / layer.rowoff;

            // Draw the elements along the layer
            for (var x = -maxWH - (index % layer.rowoff) * rowOffset; x <= maxWH; x += hOffset) {
              drawLayer(layer, x + layer.hspace, y + layer.vspace + yoff);
            }

            yoff += thisHeight;
          })
          index += 1;
        }

        sketch.rotate(-state.angle);
      }
    }
    setWebbingSketch(new p5(thisSketch));
    console.log(webbingSketch)
  })

  console.log(webbingSketch)

  // useEffect(() => {
  //   webbingSketch?.draw();
  // }, [webbingSketch, state])

  return (
    <div className={styles.container}>
      {/* <div className={styles.webbing} ref={(ref) => { ref?.appendChild(canvas) }}></div> */}
    </div>
  );
}