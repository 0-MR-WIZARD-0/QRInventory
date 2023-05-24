import { useEffect, useRef } from "react";

export const useObserver = (cb: (entires: IntersectionObserverEntry[]) => void) => {
  const observer = useRef<IntersectionObserver>();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(cb, { root: document, threshold: 0.5 });
    if (ref.current) {
      observer.current.observe(ref.current);
    }

    return () => {
      observer.current?.disconnect();
    };
  });

  return [ref];
};
