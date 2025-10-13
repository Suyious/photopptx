import { RefObject } from "react"

function getOptimumHeight(ref: RefObject<HTMLDivElement>, fallback = 300) {
  if (ref.current) {
    return window.innerHeight - ref.current.getBoundingClientRect().top - 50
  }
  return fallback;
}

export default getOptimumHeight;