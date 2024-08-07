"use client";

import Webbing from "@/components/Webbing";
import WebbingDesigner from "@/components/WebbingDesigner";

import WebbingState, { WebbingLayer, emptyWebbingState } from "@/lib/WebbingState";

import { useState } from "react";

export interface StateFuncs {
  appendLayer: (arg0: WebbingLayer) => void,
  editLayer: (arg0: string, arg1: string, arg2: any) => void,
  removeLayer: (arg0: string) => void,
  setWebbingName: (arg0: string) => void,
  setWebbingAnlge: (arg0: number) => void
}

export default function Home() {
  const [webbingState, setWebbingState] = useState<WebbingState>(emptyWebbingState);

  const appendLayer: (arg0: WebbingLayer) => void = (layer) => { }
  const editLayer: (arg0: string, arg1: string, arg2: any) => void = (layer, field, value) => { }
  const removeLayer: (arg0: string) => void = (layer) => { }
  const setWebbingName: (arg0: string) => void = (name) => { }
  const setWebbingAnlge: (arg0: number) => void = (angle) => { }

  const stateFuncs: StateFuncs = {
    appendLayer,
    editLayer,
    removeLayer,
    setWebbingName,
    setWebbingAnlge
  }

  return (
    <main className="containerRow">
      <Webbing state={webbingState} stateFuncs={stateFuncs} />
      <WebbingDesigner state={webbingState} stateFuncs={stateFuncs} />
    </main>
  );
}
