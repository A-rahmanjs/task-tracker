export default function useLocalStorage<T>(key: string) {
  function setItem(value: T): void {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  }

  function getItem(): T | undefined {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  function removeItem(): void {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }

  return { setItem, getItem, removeItem };
}
