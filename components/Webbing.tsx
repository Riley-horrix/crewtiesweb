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

  const p5 = require("p5");
  const [webbingSketch, setWebbingSketch] = useState();

  useEffect(() => {
    const thisSketch = (sketch: p5) => {
      const imgMap: Map<string, p5.Image> = new Map();

      sketch.setup = () => {
        sketch.createCanvas(displayW, displayH);
        sketch.translate(displayW / 2, displayH / 2);
        sketch.angleMode(sketch.DEGREES);
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
            var img = imgMap.get(layer.id);
            if (img === undefined) {
              img = sketch.loadImage(layer.img);
              imgMap.set(layer.id, img);
            }
            return img.width + layer.hspace * 2;
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
            return img.height + layer.vspace * 2;
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
          state.layers.forEach((layer) => {
            if (layer.state == LayerState.NONE) {
              yoff += calcHeight(layer);
              return;
            }

            const hOffset = calcWidth(layer);

            for (var x = -maxWH; x <= maxWH; x += hOffset) {

            }
            yoff += calcHeight(layer);
          })
          index += 1;
        }

        sketch.rotate(-state.angle);
      }
    }
  }, [])
  return (
    <div className={styles.container}>
    </div>
  );
}