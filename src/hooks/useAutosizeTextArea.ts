import { useEffect, useRef } from "react";

const useAutosizeTextArea = (value: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return textAreaRef;
};

export default useAutosizeTextArea;
