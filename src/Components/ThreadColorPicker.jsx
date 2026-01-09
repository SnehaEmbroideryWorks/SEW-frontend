import ColorSwatchGrid from "./ColorSwatchGrid";

export default function ThreadColorPicker({
  item,
  index,
  catalogue,
  onUpdate
}) {
  return (
    <div className="border border-blue-200 rounded-lg p-4 mb-4">
      {/* Label */}
      <input
        type="text"
        placeholder="Area (e.g. Flower)"
        value={item.label}
        onChange={e => onUpdate(index, "label", e.target.value)}
        className="w-full border border-blue-300 rounded p-2 mb-3"
      />

      {/* Color Catalogue */}
      <ColorSwatchGrid
        colors={catalogue}
        selectedColor={item.color}
        onSelect={color =>
          onUpdate(index, "color", color.hex)
        }
      />
    </div>
  );
}
