/**
 * @file layout.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Api layer functions
 * @version 0.1
 * @date 2024-09-03
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import WebbingState, { emptyWebbingState, WebbingLayer } from "@/lib/WebbingState";

/**
 * 
 * @param request 
 * @param param1 
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id: string = params.id // UID of group

  // Fetch data from DB

  const data: WebbingState[] = [emptyWebbingState(), emptyWebbingState(), emptyWebbingState(), emptyWebbingState(), emptyWebbingState()];
  data[0].name = "Design " + id
  data[1].name = "Design 2 " + id
  data[2].name = "Design1 " + id
  data[3].name = "Design2 2 " + id
  data[4].name = "Design3 " + id

  data[0].layers[0].bgColor = "#ff0000"
  data[1].layers[0].bgColor = "#00ff00"
  data[2].layers[0].bgColor = "#0000ff"
  data[3].layers[0].bgColor = "#00ffff"
  data[4].layers[0].bgColor = "#ffff00"

  return Response.json(data);
}