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

import styles from "./Webbing.module.css";

import { webbingSketch } from "@/lib/webbingSketch"
import WebbingState from "@/lib/webbingState";

import { P5jsContainer } from "@/components/P5jsContainer";

import React from "react";


interface Props {
  state: WebbingState
}

/**
 * The webbing display component.
 * @param state The WebbingState object
 * @returns 
 */
export default function Webbing({ state }: Props) {
  return (
    <div className="flex flex-row justify-centre">
      <P5jsContainer sketch={webbingSketch(state)} className="w-[100px] h-[600px] border border-accent background-foreground" />
    </div>
  );
}