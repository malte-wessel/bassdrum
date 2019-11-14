import { JSX } from 'preact';

export type AnimationEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedAnimationEvent<T>>;
export type ClipboardEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedClipboardEvent<T>>;
export type CompositionEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedCompositionEvent<T>>;
export type DragEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedDragEvent<T>>;
export type FocusEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedFocusEvent<T>>;
export type KeyboardEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedKeyboardEvent<T>>;
export type MouseEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedMouseEvent<T>>;
export type PointerEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedPointerEvent<T>>;
export type TouchEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedTouchEvent<T>>;
export type TransitionEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedTransitionEvent<T>>;
export type UIEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedUIEvent<T>>;
export type WheelEventHandler<
    T extends EventTarget = HTMLElement
> = JSX.EventHandler<JSX.TargetedWheelEvent<T>>;

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
