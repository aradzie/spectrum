import { type CSSProperties, type RefObject, useEffect, useImperativeHandle, useRef } from "react";
import { type ClassName, type MouseProps, type WheelProps } from "./types.ts";

export type CanvasProps = {
  className?: ClassName;
  id?: string;
  ref?: RefObject<CanvasRef | null>;
  style?: CSSProperties;
  title?: string;
} & MouseProps &
  WheelProps;

export type CanvasRef = {
  getBoundingClientRect: () => DOMRect;
  getSize: () => { width: number; height: number };
  getContext: typeof HTMLCanvasElement.prototype.getContext;
  toBlob: typeof HTMLCanvasElement.prototype.toBlob;
  toDataURL: typeof HTMLCanvasElement.prototype.toDataURL;
};

export function Canvas({ className, id, ref, style, title, ...props }: CanvasProps) {
  const element = useRef<HTMLCanvasElement>(null);
  useImperativeHandle(ref, () => ({
    getBoundingClientRect: () => {
      const canvas = element.current!;
      return canvas.getBoundingClientRect();
    },
    getSize: () => {
      const { width, height } = element.current!;
      return { width, height };
    },
    getContext: (...args) => {
      const canvas = element.current!;
      return canvas.getContext.call(canvas, ...args) as any;
    },
    toBlob: (...args) => {
      const canvas = element.current!;
      canvas.toBlob.call(canvas, ...args);
    },
    toDataURL: (...args) => {
      const canvas = element.current!;
      return canvas.toDataURL.call(canvas, ...args);
    },
  }));
  useEffect(() => {
    const canvas = element.current!;
    const context = canvas.getContext("2d")!;
    const { width, height } = canvas.getBoundingClientRect();
    const ratio = devicePixelRatio;
    canvas.width = Math.max(1, width * ratio);
    canvas.height = Math.max(1, height * ratio);
    context.scale(ratio, ratio);
  }, []);
  return (
    <canvas
      ref={element}
      id={id}
      className={className}
      style={{
        display: "block",
        inlineSize: "100%",
        blockSize: "100%",
        ...style,
      }}
      title={title}
      {...props}
    />
  );
}
