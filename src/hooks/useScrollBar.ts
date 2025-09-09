import { useEffect, useState } from 'react'

// Custom hook that determines if the items inside of a container are taller than the container itself
// If so, a scrollbar class is added to the container
export default function useScrollBar(
  containerRef:
    | React.RefObject<HTMLDivElement | null>
    | React.RefObject<HTMLFieldSetElement | null>
    | null,
  itemRef: React.RefObject<HTMLDivElement | null> | null,
  items: string[]
) {
  const [scrollBar, setScrollBar] = useState<boolean>(true)

  useEffect(() => {
    const containerHeight = containerRef?.current?.clientHeight
    const itemHeight = itemRef?.current?.clientHeight
    if (containerHeight && itemHeight) {
      if (containerHeight < itemHeight * items.length) {
        setScrollBar(true)
      } else {
        setScrollBar(false)
      }
    }
    console.log('containerHeight', containerHeight)
  }, [containerRef, itemRef, items])

  return { scrollBar }
}
