function Popup({ isOpen, isClosed, children }) {
  if (!isOpen) return null;

  return (
    <div>
      <div className="bg-sidebarColor text-mainHeading rounded-xl shadow-lg p-6 w-100 relative">
        <button
          onClick={isClosed}
          className="absolute top-5 right-5 text-white hover:text-subText"
        >
          X
        </button>

        {children}
      </div>
    </div>
  );
}

export default Popup;
