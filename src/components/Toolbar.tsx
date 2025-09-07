interface Props {
  minimized: boolean;
  onRestore: () => void;
}

export default function Toolbar({ minimized, onRestore }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
  {minimized && (
    <button
      onClick={onRestore}
      className="bg-blue-600 text-white px-3 py-1 rounded shadow pointer-events-auto"
    >
      Floating Popup
    </button>
  )}
</div>

  );
}
