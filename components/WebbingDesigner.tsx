import WebbingState from "@/lib/WebbingState"
import { StateFuncs } from "@/app/design/page"

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

export default function WebbingDesigner({ state, stateFuncs }: Props) {
  return <h1>Designer</h1>
}