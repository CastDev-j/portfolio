import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function ScopedLoader() {
  const { progress, active } = useProgress();
  const [state, setState] = useState<"loading" | "fading" | "hidden">(
    "loading",
  );

  useEffect(() => {
    if (!active && state === "loading") {
      const timer = setTimeout(() => setState("fading"), 300);
      return () => clearTimeout(timer);
    }
  }, [active, state]);

  useEffect(() => {
    if (state === "fading") {
      const timer = setTimeout(() => setState("hidden"), 500);
      return () => clearTimeout(timer);
    }
  }, [state]);

  if (state === "hidden") return null;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "1rem",
        zIndex: 10,
        pointerEvents: "none",
        opacity: state === "fading" ? 0 : 1,
        transition: "opacity 0.5s ease",
      }}
    >
      <div
        style={{
          width: "240px",
          height: "4px",
          backgroundColor: "#263b3b",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            backgroundColor: "#498382",
            borderRadius: "9999px",
            transition: "width 0.2s ease",
          }}
        />
      </div>
      <span
        style={{
          color: "#498382",
          fontFamily: "monospace",
          fontSize: "13px",
          letterSpacing: "0.08em",
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
}
