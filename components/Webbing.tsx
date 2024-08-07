import WebbingState from "@/lib/WebbingState"
import { StateFuncs } from "@/app/design/page"

interface Props {
  state: WebbingState,
  stateFuncs: StateFuncs
}

export default function Webbing({ state, stateFuncs }: Props) {
  return <h1>Webbing</h1>
}