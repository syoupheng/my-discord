import { Dispatch, SetStateAction, useEffect, useState } from "react";

const useLocalStorage = <TValue>(storageKey: string, defaultValue: TValue): [TValue, Dispatch<SetStateAction<TValue>>] => {
  const localStorageValue = localStorage.getItem(storageKey);
  const [value, setValue] = useState<TValue>(localStorageValue ? JSON.parse(localStorageValue) : defaultValue);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(value));
  }, [value, storageKey]);
  return [value, setValue];
};

export default useLocalStorage;
