/**
 * @file WebbingDesigner.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Webbing designer component
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import WebbingState from "@/lib/webbingState"
import { StateFuncs } from "@/app/design/page"

import styles from "./WebbingDesign.module.css";

import React from "react";
import WebbingSlider from "../../components/webbing/WebbingSlider";

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

/**
 * The webbing designer component allows a user to change or create a webbing design.
 * @param state The WebbingState object.
 * @param stateFuncs The WebbingState mutator functions of type StateFuncs.
 * @returns 
 */
export default function WebbingDesigner({ state, stateFuncs }: Props) {
  console.log(state.angle);
  return (
    <div className={styles.container}>
      {/* TODO - maybe change to a custom input field. */}
      <h1><i>{state.name}</i>{' '}<i className="bi bi-pencil-square"></i></h1>
      <hr className={styles.hdivider}></hr>
      <WebbingSlider label="Angle" min={-90} max={90} step={1} start={0} init={0} valueDisplay={(num) => `${num} deg`} onChangeFunc={(val) => { stateFuncs.setWebbingAnlge(val) }} tooltip="The angle that the design is rotated on the webbing." />
      <hr className={styles.hdivider}></hr>
    </div>
  );
}