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
  valueDisplay?: (arg0: SliderValue) => string,
  onChangeFunc?: (arg0: SliderValue) => void,
  tooltip: string
}

export default function DesignSlider({ label, min, max, step = undefined, start = undefined, init = undefined, marks = undefined, valueDisplay = undefined, onChangeFunc = undefined, tooltip = "" }: Props) {

  // const [val, setVal] = useState(init);
  const [ttOpen, setTTOpen] = useState<boolean>(false);

  return (
    <Slider
      label={label}
      size="md"
      color="primary"
      step={step}
      maxValue={max}
      minValue={min}
      fillOffset={start}
      defaultValue={init}
      getValue={valueDisplay}
      // onChange={setVal}
      onChangeEnd={onChangeFunc}
      classNames={{
        base: "w-full",
        // thumb: "bg-white border-2 border-accent",
        track: "bg-ter",
        // filler: "bg-accent"
      }}
      renderLabel={({ children, ...props }) => (
        <label {...props} className="text-medium flex gap-2 items-center">
          {children}
          <Tooltip
            className="w-[200px] px-1.5 text-tiny text-default-600 rounded-small"
            content={tooltip}
            isOpen={ttOpen}
            placement="right"
          >
            <span className="transition-opacity opacity-80 hover:opacity-100">
              {/* TODO : This is hacky and doesn't really work on mobiles. Maybe change to nextui button */}
              <i className="bi bi-info-circle"
                onMouseEnter={() => {
                  setTTOpen(true);
                }}
                onMouseLeave={() => {
                  setTTOpen(false);
                }}
                onClick={() => {
                  setTTOpen(prev => !prev);
                }}
              ></i>
            </span>
          </Tooltip>
        </label>
      )}
      marks={marks}
      formatOptions={{ signDisplay: 'always' }}
    />
  )
}