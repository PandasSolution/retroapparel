import React from "react";
import { add_colors } from "@/redux/features/filter";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

// prop type
type IProps = {
  colors: string[];
};

const ColorFilter = ({ colors }: IProps) => {
  const { colors: stateColors } = useAppSelector((state) => state.filter);
  const dispatch = useAppDispatch();
  return (
    <div className="sidebar__widget mb-60">
      <div className="sidebar__widget-title mb-20">
        <h3>Choose Color</h3>
      </div>
      <div className="sidebar__widget-content">
        <div className="color__pick">
          <div>
            <ul>
              {colors.map((color, i) => (
                <li key={i}>
                  <button
                    onClick={() => dispatch(add_colors(color))}
                    className={`color color-${i + 1} ${stateColors.includes(color) ? "active" : ""}`}
                  ></button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFilter;
