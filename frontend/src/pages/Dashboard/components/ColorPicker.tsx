import React from "react";

type ColorPickerProps = {
  color: string;
  onColorChange: (color: string) => void;
  className?: string;
};
const ColorPicker: React.FC<ColorPickerProps> = ({
  color,
  onColorChange,
  className,
}) => {
  return (
    <div
      className={`color-picker-container flex-col items-center ${className}`}
    >
      <h1 className="m-4 text-2xl font-bold">Color Picker</h1>
      <div
        className="color-display w-[200px] h-[200px] flex text-center mb-2 justify-center items-center border-2 rounded-lg transition duration-250 ease-in p-4"
        style={{ backgroundColor: color }}
      >
        <p style={{ color: "hsl(0, 0%, 20%)" }} className="font-normal">
          Selected Color: {color}
        </p>
      </div>

      <label className="mb-2 font-medium" htmlFor="">
        Select a Color:
      </label>
      <input
        className="w-14 h-14 rounded-lg border-0 p-[2px] appearance-none outline-none"
        type="color"
        value={color}
        onChange={(e) => onColorChange(e.target.value)}
      />
    </div>
  );
};

export default ColorPicker;
