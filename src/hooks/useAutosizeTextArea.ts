import { useEffect, useRef } from "react";

const useAutosizeTextArea = (value: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const adjustHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }

    adjustHeight()

    window.addEventListener('resize', adjustHeight)
    return () => {
      window.removeEventListener('resize', adjustHeight)
    }
  }, [value]);

  return textAreaRef;
};

export default useAutosizeTextArea;
