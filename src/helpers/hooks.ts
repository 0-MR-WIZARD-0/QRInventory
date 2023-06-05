import { useEffect, useRef, useState } from "react";

export const useObserver = (cb: (entires: IntersectionObserverEntry[]) => void) => {
  const observer = useRef<IntersectionObserver>();
  const ref = useRef<any | null>(null);

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

export const useListenOnline = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener("online", handleStatusChange);

    window.addEventListener("offline", handleStatusChange);

    return () => {
      window.removeEventListener("online", handleStatusChange);
      window.removeEventListener("offline", handleStatusChange);
    };
  }, [isOnline]);

  return { isOnline };
};
