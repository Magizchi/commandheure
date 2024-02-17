const useDelay = (func: (value: any) => any, time?: number): ((value: any) => void) => {
  let timer: any;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, time);
  };
};

export default useDelay;
