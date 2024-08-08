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

import WebbingState from "@/lib/WebbingState"
import { StateFuncs } from "@/app/design/page"

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
  return <h1>Designer</h1>
}