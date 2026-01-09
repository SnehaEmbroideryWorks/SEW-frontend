export default function ColorSwatchGrid({
  colors,
  selectedColor,
  onSelect
}) {
  return (
    <>
      {colors.map((color, index) => (
        <div
          key={index}
          className="flex flex-col items-center gap-1"
        >
          <button
            onClick={() => onSelect(color)}
            title={color.name}
            className={`w-8 h-8 rounded-full border transition
              ${selectedColor === color.hex
                ? "ring-2 ring-blue-900"
                : "hover:ring-1 hover:ring-blue-400"
              }`}
            style={{ backgroundColor: color.hex }}
          />

          <span className="text-[10px] text-center leading-tight text-gray-700">
            {color.name}
          </span>
        </div>
      ))}
    </>
  );
}
