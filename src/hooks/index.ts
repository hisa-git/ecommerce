import { useEffect, useRef } from "react";

export function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback:() => void
) {
  const ref=useRef<T>(null);
  useEffect(()=>{
    const handleClickOutside=(e:MouseEvent)=>{
      //if(ref.current && !)
    }
  })
}