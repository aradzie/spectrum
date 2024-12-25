import { useEffect, useRef } from "react";
import { Canvas, type CanvasRef } from "../components/Canvas.tsx";
import * as styles from "./Spectrum.module.css";

export function Spectrum() {
  const canvasRef = useRef<CanvasRef>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const { width, height } = canvas.getSize();
    context.fillStyle = "red";
    context.fillRect(0, 0, width, height);
    const imageData = context.getImageData(0, 0, width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const r = imageData.data[i];
      const g = imageData.data[i + 1];
      const b = imageData.data[i + 2];
      const gray = 0.3 * r + 0.59 * g + 0.11 * b;
      imageData.data[i] = gray;
      imageData.data[i + 1] = gray;
      imageData.data[i + 2] = gray;
    }
    context.putImageData(imageData, 0, 0);
  }, []);
  return (
    <div className={styles.root}>
      <Canvas ref={canvasRef} />
    </div>
  );
}
