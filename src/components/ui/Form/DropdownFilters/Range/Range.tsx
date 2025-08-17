'use client'

import * as Slider from '@radix-ui/react-slider'
import styles from './Range.module.css'

type RangeProps = {
  max: number
  buttonText: string
}

export default function Range({ max, buttonText }: RangeProps) {
  return (
    <>
      <div className={styles.selectionContainer}>
        <p className={styles.selectionTextContainer}>
          <span className={styles.selectionText}>range selected:</span>
          <span className={styles.selectionTextValue}>3/10 - 10/10</span>
        </p>
        <button className={styles.clearButton} onClick={() => {}}>
          clear
        </button>
      </div>
      <div className={styles.rangeContainer}>
        <Slider.Root
          className={styles.sliderRoot}
          defaultValue={[0, 10]}
          max={10}
          step={1}
        >
          <Slider.Track className={styles.sliderTrack}>
            <Slider.Range className={styles.sliderRange} />
          </Slider.Track>
          <Slider.Thumb className={styles.sliderThumb} />
          <Slider.Thumb className={styles.sliderThumb} />
        </Slider.Root>
      </div>
    </>
  )
}
