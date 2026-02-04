"use client";

import { useEffect, useState } from "react";

export function VisualEditsWrapper() {
  const [VisualEditsMessenger, setVisualEditsMessenger] = useState<any>(null);

  useEffect(() => {
    // Try to import the VisualEditsMessenger dynamically
    import("orchids-visual-edits")
      .then((mod) => {
        setVisualEditsMessenger(() => mod.VisualEditsMessenger);
      })
      .catch((error) => {
        console.warn("VisualEditsMessenger not available:", error);
      });
  }, []);

  if (!VisualEditsMessenger) {
    return null;
  }

  return <VisualEditsMessenger />;
}
