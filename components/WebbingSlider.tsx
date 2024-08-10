/**
 * @file Slider.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief File containing the Slider component
 * @version 0.1
 * @date 2024-08-10
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import styles from "./WebbingSlider.module.css";

import React, { useState } from "react";
import { Slider, SliderValue } from "@nextui-org/slider";
import { Tooltip } from "@nextui-org/react";

interface Mark {
  value: number,
  label: string
}

interface Props {
  label: string,
  min: number,
  max: number,
  step?: number,
  start?: number,
  init?: number,
  marks?: Mark[],
  valueDisplay?: (arg0: SliderValue) => string
}

export default function DesignSlider({ label, min, max, step = 1, start = 0, init = 0, marks = undefined, valueDisplay = undefined }: Props) {

  const [val, setVal] = useState(init);

  return (
    <Slider
      label={label}
      size="md"
      // color="warning"
      step={step}
      maxValue={max}
      minValue={min}
      fillOffset={start}
      defaultValue={init}
      getValue={valueDisplay}
      onChange={setVal}
      classNames={{
        base: "max-w-md",
        thumb: "bg-accent",
        track: "bg-ter",
        filler: "bg-accent"
      }}
      renderLabel={({ children, ...props }) => (
        <label {...props} className="text-medium flex gap-2 items-center">
          {children}
          <Tooltip
            className="w-[200px] px-1.5 text-tiny text-default-600 rounded-small"
            content="The angle that the design is drawn onto the webbing at."
            placement="right"
          >
            <span className="transition-opacity opacity-80 hover:opacity-100">
              <i className="bi bi-info-circle"></i>
            </span>
          </Tooltip>
        </label>
      )}
      marks={marks}
      formatOptions={{ signDisplay: 'always' }}
    />
  )
}