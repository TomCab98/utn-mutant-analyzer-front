export type StringRecord<T> = {
  [P in keyof T]?: string;
};
