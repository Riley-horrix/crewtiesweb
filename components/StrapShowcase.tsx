import WebbingState from "@/lib/WebbingState";
import { Card, Skeleton } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { P5jsContainer } from "./P5jsContainer";
import { webbingSketch } from "@/lib/WebbingSketch";

import { red0 } from "@/lib/designs/red0";
import { red1 } from "@/lib/designs/red1";
import { red2 } from "@/lib/designs/red2";
import { red3 } from "@/lib/designs/red3";
import { blue0 } from "@/lib/designs/blue0";
import { blue1 } from "@/lib/designs/blue1";
import { blue2 } from "@/lib/designs/blue2";
import { blue3 } from "@/lib/designs/blue3";
import { orange0 } from "@/lib/designs/orange0";
import { orange1 } from "@/lib/designs/orange1";
import { orange2 } from "@/lib/designs/orange2";
import { orange3 } from "@/lib/designs/orange3";

interface StrapShowcaseProps {
  sets: WebbingState[][]
}

export default function StrapShowcase() {
  // export default function StrapShowcase(props: StrapShowcaseProps) {
  // const strapData: WebbingState[][] = props.sets;
  const strapData: WebbingState[][] = loadStrapData().sets;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [prevInterval, setPrevInterval] = useState<NodeJS.Timeout>();
  const [pageNo, setPageNo] = useState<number>(0);

  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (!isMounted) { return; }
    clearInterval(prevInterval);
    setPrevInterval(setInterval(() => {
      setPageNo((prev) => {
        return (prev + 1 >= strapData.length) ? 0 : prev + 1
      })
    }, 6000));
  }, [isMounted])

  return (
    <div className="flex flex-row gap-[15px] justify-center">
      <div className="flex flex-col gap-[30px] pt-[50px]">
        <RenderStrap state={strapData[pageNo][0]} />
        <RenderStrap state={strapData[pageNo][1]} />
      </div>
      <div className="flex flex-col gap-[30px]">
        <RenderStrap state={strapData[pageNo][2]} />
        <RenderStrap state={strapData[pageNo][3]} />
      </div>
    </div>
  );
}

// This function gets called at build time
// export async function getStaticProps() {
const loadStrapData = () => {
  const res: StrapShowcaseProps = {
    sets: [
      [
        JSON.parse(blue0),
        JSON.parse(blue1),
        JSON.parse(blue2),
        JSON.parse(blue3),
      ],
      [
        JSON.parse(red0),
        JSON.parse(red1),
        JSON.parse(red2),
        JSON.parse(red3),
      ],
      // [
      //   JSON.parse(orange0),
      //   JSON.parse(orange1),
      //   JSON.parse(orange2),
      //   JSON.parse(orange3),
      // ],
    ]
  }
  return res;
}

async function loadStrap(path: string) {
  const strapData: WebbingState = await fetch(path)
    .then((res) => res.text())
    .then((text) => {
      return JSON.parse(text);
    })
  return strapData;
}

interface RenderStrapProps {
  state: WebbingState
}

function RenderStrap({ state }: RenderStrapProps) {

  return (
    <Card className="w-[160px] h-[350px] space-y-5 p-2" radius="md">
      <P5jsContainer sketch={webbingSketch(state)} className={"w-full h-full"} />
    </Card>
  );
}