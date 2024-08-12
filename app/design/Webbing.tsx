"use client";

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

import WebbingState from "@/lib/webbingState";

import styles from "./Webbing.module.css";

interface Props {
  state: WebbingState
}

import { useEffect, useRef, useState } from "react";

import p5Types from "p5";
import React from "react";
import { P5jsContainer } from "@/components/P5jsContainer";

import { webbingSketch } from "@/lib/webbingSketch"

/**
 * The webbing display component.
 * @param state The WebbingState object
 * @returns 
 */
export default function Webbing({ state }: Props) {
  return (
    <div className={styles.container}>
      <P5jsContainer sketch={webbingSketch(state)} className={styles.webbing} />
    </div>
  );
}