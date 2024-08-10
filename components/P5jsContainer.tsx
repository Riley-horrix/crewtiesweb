import p5Types from "p5";
import { RefObject, useEffect, useRef, useState } from "react";

type P5jsContainerRef = HTMLDivElement;
type P5jsSketch = (p: p5Types, parentRef: P5jsContainerRef) => void;
type P5jsContainer = ({ sketch, className }: { sketch: P5jsSketch, className: string }) => React.JSX.Element;

// From https://aleksati.net/posts/how-to-use-p5js-with-nextjs-in-2024#building-a-p5-container-component

export const P5jsContainer: P5jsContainer = ({ sketch, className }) => {
  const parentRef = useRef<P5jsContainerRef>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false)

  // on mount
  useEffect(() => {
    setIsMounted(true);
  }, [])

  useEffect(() => {
    if (!isMounted) return;
    var p5instance: p5Types;
    const initP5 = async () => {
      try {
        // import the p5 client-side
        const p5 = (await import("p5")).default;
        new p5((p) => {
          sketch(p, parentRef.current);
          p5instance = p;
        });
      } catch (error) {
        console.log(error);
      }
    };

    initP5();
    if (p5instance !== undefined) {
      p5instance.remove();
    }
  }, [isMounted, sketch]);

  return <div ref={parentRef} className={className}></div>;
};