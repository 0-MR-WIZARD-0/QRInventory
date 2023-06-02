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

const imageMimeType = /image\/(png|jpg|jpeg|.gif)/i;
export const useImage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileDataURL, setFileDataURL] = useState<string | null>(null);
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) {
      alert("Файлы не выбраны");
      return;
    }
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Тип файла не подходит для изображения предмета");
      return;
    }
    setFile(file);
  };
  useEffect(() => {
    let fileReader: FileReader;
    let isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = e => {
        const { result } = e.target!;
        if (result && !isCancel) {
          setFileDataURL(result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);



  return { fileDataURL, changeHandler };
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
