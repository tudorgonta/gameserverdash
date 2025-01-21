// Snackbar.tsx
import React from "react";

interface SnackbarProps {
  isVisible: boolean;
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ isVisible, message }) => {
  if (!isVisible) return null;

  return (
    <div
      className="z-[1000] fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-green-500 text-white text-sm font-medium rounded-lg shadow-lg transition-opacity duration-300"
      role="alert"
    >
      {message}
    </div>
  );
};

export default Snackbar;
