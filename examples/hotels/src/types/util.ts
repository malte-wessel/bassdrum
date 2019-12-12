export type ValueOf<T> = T[keyof T];

export type ArgumentTypes<T> = T extends (...args: infer U) => infer R
    ? U
    : never;

export type ReplaceReturnType<T, TNewReturn> = (
    ...a: ArgumentTypes<T>
) => TNewReturn;

export type Dictionary<T> = {
    [key: string]: T;
};
