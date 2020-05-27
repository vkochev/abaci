export function saveToLocalStorage(key: string, value: object) {
  localStorage.setItem(key, JSON.stringify(value, replacer));
}

function replacer(this: any, key: any, value: any) {
  if (!value || typeof value !== 'object') {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(replaceValue);
  }

  return Object.fromEntries(Object.entries<any>(value).map(([k, v]) => [k, replaceValue(v)]));
}

function replaceValue(value: any) {
  const type = value?.__proto__?.constructor?.name;
  switch (type) {
    case 'Map':
      return { type, content: [...value.entries()] };
    case 'Date':
      return { type, content: value.valueOf() };
    default:
      return value;
  }
}

export function getFromLocalStorage(key: string) {
  const value = localStorage.getItem(key);
  if (!value) return null;

  return JSON.parse(value, reviver);
}

function reviver(this: any, _: string, value: any) {
  switch (value?.type) {
    case 'Map':
      return new Map(value.content);
    case 'Date':
      return new Date(value.content);
    default:
      return value;
  }
}

export const localStorageSaverMiddleware = (key: string) => <
  R extends (...args: any[]) => any,
  Params extends any[] = Parameters<R>
>(
  reducer: R
) => (...args: Params): ReturnType<R> => {
  const obj = reducer(...args);
  saveToLocalStorage(key, obj);
  return obj;
};
