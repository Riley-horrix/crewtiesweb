
import p5Types from "p5";
import WebbingState, { fontEnumToString, LayerState, WebbingLayer } from "./webbingState";

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;

export const webbingSketch: (arg0: WebbingState) => P5jsSketch = (state: WebbingState) => {
  return ((sketch: p5Types, parentRef: HTMLDivElement,) => {
    const imgMap: Map<string, p5Types.Image> = new Map();
    var maxWH = 0;

    sketch.setup = () => {
      var parentStyle = window.getComputedStyle(parentRef);
      const pWidth = parseInt(parentStyle.width);
      const pHeight = parseInt(parentStyle.height);
      const canvas = sketch.createCanvas(pWidth, pHeight).parent(parentRef);

      sketch.translate(pWidth / 2, pHeight / 2);
      sketch.angleMode(sketch.DEGREES);
      sketch.rectMode(sketch.CORNER);
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
    const getImgDimensions = (img: p5Types.Image, size: number) => {
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
      console.log("Drawing Webbing")
      sketch.background(20, 100, 200)
      var totalHeight = 0;

      // Calculate total height of all layers and populate images.
      state.layers.forEach((layer) => {
        totalHeight += calcHeight(layer);
      })

      sketch.rotate(state.angle);

      // If no layers then don't draw
      if (totalHeight === 0 || state.layers.length === 0) {
        return;
      }

      var index = 0;
      for (var y = -maxWH; y <= maxWH; y += totalHeight) {
        var yoff = 0;
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
  })
}