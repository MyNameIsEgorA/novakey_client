import * as Toast from "@radix-ui/react-toast";
import React from "react";

const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <Toast.Provider swipeDirection="right">
      {children}
      {/* Toast viewport will be rendered here by individual toasts */}
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastProvider;
