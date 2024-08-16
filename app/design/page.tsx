"use client";

/**
 * @file page.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief /design page
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import Webbing from "@/app/design/Webbing";
import WebbingDesigner from "@/app/design/WebbingDesigner";

import WebbingState, { WebbingLayer, emptyWebbingState } from "@/lib/webbingState";

import styles from "./design.module.css";

import { useState } from "react";

/**
 * The object interface used to manipulate the webbing design.
 * @member appendLayer Adds a new layer object into the webbing design.
 * @member editLayer Edit an existing layer object with the name of the field and the new value.
 * @member removeLayer Remove a layer from the webbing design.
 * @member setWebbingName Set the name of the webbing design.
 * @member setWebbingAngle Set the angle of the webbing design.
 */
export interface StateFuncs {
  /**
   * @brief Adds a new layer object into the webbing design.
   * @param arg0 The webbing layer to add.
   */
  appendLayer: (arg0: WebbingLayer) => void,
  /**
   * Edit an existing layer object with the name of the field and the new value.
   * @param arg0 The layer id.
   * @param arg1 The field that you wish to edit in the WebbingLayer object.
   * @param arg2 The new value for that field.
   */
  editLayer: (arg0: string, arg1: string, arg2: any) => void,
  /**
   * Remove a layer from the webbing design.
   * @param arg0 The id of the layer
   */
  removeLayer: (arg0: string) => void,
  /**
   * Set the name of the webbing design.
   * @param arg0 The new name.
   */
  setWebbingName: (arg0: string) => void,
  /**
   * Set the angle of the webbing design.
   * @param arg0 The new angle.
   */
  setWebbingAnlge: (arg0: number) => void
}

/**
 * The main design page component. Maintains the current state of the webbing design
 * and provides functions to manipulate the design to it's children.
 */
export default function Design() {
  const [name, setName] = useState<string>(emptyWebbingState().name);
  const [angle, setAngle] = useState<number>(emptyWebbingState().angle);
  const [layers, setLayers] = useState<WebbingLayer[]>(emptyWebbingState().layers)

  const appendLayer: (arg0: WebbingLayer) => void = (layer) => {
    setLayers(prev => [...prev, layer]);
  }
  const editLayer: (arg0: string, arg1: string, arg2: any) => void = (layerId, field, value) => {
    setLayers((prev) => {
      return prev.map((layer) => {
        if (layer.id === layerId) {
          return ({
            ...layer,
            [field]: value
          })
        } else {
          return layer;
        }
      });
    })
  }
  const removeLayer: (arg0: string) => void = (layerId) => {
    setLayers((prev) => prev.filter((item) => item.id !== layerId));
  }
  const setWebbingName: (arg0: string) => void = (newName) => {
    setName(newName);
  }
  const setWebbingAnlge: (arg0: number) => void = (newAngle) => {
    setAngle(newAngle);
  }

  const stateFuncs: StateFuncs = {
    appendLayer,
    editLayer,
    removeLayer,
    setWebbingName,
    setWebbingAnlge
  }

  const webbingState = {
    name,
    angle,
    layers
  }

  return (
    <main className="flex flex-row justify-between items-top w-full h-full p-3 gap-x-3">
      <Webbing state={webbingState} />
      <WebbingDesigner state={webbingState} stateFuncs={stateFuncs} />
    </main>
  );
}
