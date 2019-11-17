import { JSX } from 'preact';

export type Handler<T> = (e: T) => void;

export type AnimationEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedAnimationEvent<T>;
export type ClipboardEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedClipboardEvent<T>;
export type CompositionEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedCompositionEvent<T>;
export type DragEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedDragEvent<T>;
export type FocusEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedFocusEvent<T>;
export type KeyboardEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedKeyboardEvent<T>;
export type MouseEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedMouseEvent<T>;
export type PointerEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedPointerEvent<T>;
export type TouchEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedTouchEvent<T>;
export type TransitionEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedTransitionEvent<T>;
export type UIEvent<T extends EventTarget = HTMLElement> = JSX.TargetedUIEvent<
    T
>;
export type WheelEvent<
    T extends EventTarget = HTMLElement
> = JSX.TargetedWheelEvent<T>;
