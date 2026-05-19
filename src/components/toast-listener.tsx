"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export default function ToastListener() {
  useEffect(() => {
    // Reset login toast flag so that the next successful login is guaranteed to show the toast
    sessionStorage.removeItem("login_toast_shown");

    const msg = sessionStorage.getItem("logout_message");
    if (msg) {
      sessionStorage.removeItem("logout_message");
      setTimeout(() => {
        toast.success(msg);
      }, 100);
    }
  }, []);

  return null;
}
