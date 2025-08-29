"use client"
import { getTrackBackground, Range } from "react-range";
// prop type 
type IProps = {
  STEP:number;
  MIN:number;
  MAX:number;
  values:number[];
  handleChanges: (val: number[]) => void
}
const InputRange = ({ STEP, MIN, MAX, values, handleChanges }:IProps) => {
  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            key='track'
            style={{
              ...props.style,
              height: '3px',
              width: '100%',
              background: getTrackBackground({
                values: values,
                colors: ["#c69c6d", "#c69c6d", "#c69c6d"],
                min: MIN,
                max: MAX
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props,index }) => (
          <div
            {...props}
            key={`thumb-${index}`}
            style={{
              ...props.style,
              height: '17px',
              width: '5px',
              backgroundColor: "#c69c6d"
            }}
          />
        )}
      />
    </>
  );
};


export default InputRange;
