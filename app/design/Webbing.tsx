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
import { webbingSketch } from "@/lib/WebbingSketch"
import WebbingState from "@/lib/WebbingState";

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
      <P5jsContainer sketch={webbingSketch(state)} className="w-[100px] h-full min-h-[500px] shadow shadow-foreground" />
    </div>
  );
}