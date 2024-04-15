import { playlist, song } from "@nano/player"
import { useStore } from "@nanostores/react"
import type { ChangeEvent, LegacyRef } from "react"

interface Props {
  minValue: number,
  maxValue: number,
  initialValue: number,
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void
  className: string,
  showLimits?: boolean,
  ref?: LegacyRef<HTMLInputElement>
}

function Slider({ minValue, maxValue, initialValue, changeHandler, className, showLimits }: Props) {

  const $song = useStore(song)

  if (!showLimits) {
    return (
      <input
        className={className}
        onChange={changeHandler}
        type="range"
        min={minValue}
        max={maxValue}
        value={initialValue}
      />
    )
  }

  return (
    // padStart tip by midudev xd
    <div className="flex flex-row flex-grow gap-4">
      <span>
        {Math.floor(initialValue / 60)}:{Math.floor(initialValue % 60).toString().padStart(2, "0")}
      </span>
      <input
        className={className}
        onChange={changeHandler}
        type="range"
        min={minValue}
        max={Number.isNaN(maxValue) ? maxValue.toString() : maxValue}
        value={initialValue}
      />
      {$song ? (
        <span>{Math.floor(maxValue / 60)}:{Math.floor(maxValue % 60).toString().padStart(2, "0")}</span>
      ) : (
        <span>0:00</span>
      )}
    </div>  
  )
}

export default Slider