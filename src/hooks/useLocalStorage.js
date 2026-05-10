import { useState, useEffect } from 'react';

export function useLocalStorage(
  key,
  initialValue
) {

  // Initialize state from localStorage
  const [storedValue, setStoredValue] =
    useState(() => {

      try {

        // Get item from localStorage
        const item =
          window.localStorage.getItem(key);

        // Return parsed value or initialValue
        return item
          ? JSON.parse(item)
          : initialValue;

      } catch (error) {

        console.error(error);

        return initialValue;

      }
    });

  // Update localStorage whenever value changes
  useEffect(() => {

    try {

      window.localStorage.setItem(
        key,
        JSON.stringify(storedValue)
      );

    } catch (error) {

      console.error(error);

    }

  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}