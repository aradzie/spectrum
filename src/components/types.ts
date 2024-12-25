import { type KeyboardEventHandler, type MouseEventHandler, type WheelEventHandler } from "react";

export type ClassName = any;

export type MouseProps = {
  onClick?: MouseEventHandler;
  onMouseDown?: MouseEventHandler;
  onMouseUp?: MouseEventHandler;
  onMouseOver?: MouseEventHandler;
  onMouseOut?: MouseEventHandler;
  onMouseEnter?: MouseEventHandler;
  onMouseLeave?: MouseEventHandler;
};

export type WheelProps = {
  onWheel?: WheelEventHandler;
};

export type KeyboardProps = {
  onKeyDown?: KeyboardEventHandler;
  onKeyUp?: KeyboardEventHandler;
};
