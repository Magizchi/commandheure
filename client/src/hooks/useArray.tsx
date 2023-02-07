import { useState } from "react";

const useArrayHook = <TItems extends { key: number }>(defaultValue: TItems[]) => {
  const [array, setArray] = useState<TItems[]>(defaultValue);

  const save = (products: TItems[]) => setArray(products);

  const push = (element: TItems) => setArray((currArray) => [...currArray, element]);

  const remove = (index: number) => {};

  const clear = () => setArray([]);

  const update = (products: TItems): TItems[] => {
    const newArray = array.slice();
    const index = newArray.findIndex((item) => item.key === products.key);

    if (index > -1) {
      const item = newArray[index];
      newArray.splice(index, 1, {
        ...item,
        ...products,
      });
      setArray(newArray);
    } else {
      setArray([...newArray, products]);
    }
    return newArray;
  };

  return { array, set: setArray, push, remove, clear, save, update };
};

export default useArrayHook;
