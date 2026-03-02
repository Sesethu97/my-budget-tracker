function Popup({ isOpen, isClosed, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-amber-300 text-tertiary rounded-xl shadow-lg p-6 w-100 relative">
        <button
          onClick={isClosed}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          x
        </button>

        {children}
      </div>
    </div>
  );
}

export default Popup;
