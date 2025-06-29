import * as Toast from "@radix-ui/react-toast";
import React from "react";
import "./CustomToast.css"; // We'll create this CSS file next

interface CustomToastProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
}

const CustomToast: React.FC<CustomToastProps> = ({
  open,
  onOpenChange,
  title,
  description,
  actionText,
  onActionClick,
}) => {
  return (
    <Toast.Root className="ToastRoot" open={open} onOpenChange={onOpenChange}>
      <Toast.Title className="ToastTitle">{title}</Toast.Title>
      {description && (
        <Toast.Description className="ToastDescription">
          {description}
        </Toast.Description>
      )}
      {actionText && (
        <Toast.Action className="ToastAction" asChild altText={actionText}>
          <button className="Button small green" onClick={onActionClick}>
            {actionText}
          </button>
        </Toast.Action>
      )}
      <Toast.Close className="ToastClose" aria-label="Close">
        <span aria-hidden>×</span>
      </Toast.Close>
    </Toast.Root>
  );
};

export default CustomToast;
