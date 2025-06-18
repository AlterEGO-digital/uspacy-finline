export const isString = (v: unknown): v is string => typeof v === 'string';
export const isNumber = (v: unknown): v is number => typeof v === 'number';
export const isObject = (v: unknown): v is object => typeof v === 'object' && v !== null && !Array.isArray(v);
