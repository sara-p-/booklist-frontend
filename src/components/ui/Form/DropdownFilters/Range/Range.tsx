'use client'

import * as Slider from '@radix-ui/react-slider'
import styles from './Range.module.css'
import { useFilterValuesContext } from '@/hooks/useFilterValuesContext'
import useFilterStateContext from '@/hooks/useFilterStateContext'

type RangeProps = {
  max: number
  buttonText: 'rating' | 'spice'
  // onChange: (filter: 'rating' | 'spice', value: string[]) => void
}

export default function Range({ max, buttonText }: RangeProps) {
  const { filterValues, setFilterValues } = useFilterValuesContext()
  const { filterState, setFilterState } = useFilterStateContext()
  // convert the filter values to numbers since the filter values are strings
  const filterValuesNumbers = filterValues[buttonText].map((value) =>
    parseInt(value)
  )

  function handleRangeChange(value: number[]) {
    const newFilterValues = { ...filterValues }
    const valueString = value.map((value) => value.toString())
    setFilterValues({
      ...newFilterValues,
      [buttonText]: valueString,
    })
  }

  // function handleChange(value: number[]) {
  //   // convert the value to a string since the filter values are strings
  //   const valueString = value.map((value) => value.toString())
  //   onChange(buttonText as 'rating' | 'spice', valueString)
  // }

  function handleClear() {
    const newFilterValues = { ...filterValues }
    setFilterValues({
      ...newFilterValues,
      [buttonText]: ['0', max.toString()],
    })
    setFilterState({
      ...filterState,
      [buttonText]: false,
    })
  }

  return (
    <>
      <div className={styles.selectionContainer}>
        <p className={styles.selectionTextContainer}>
          <span className={styles.selectionText}>range selected:</span>
          <span className={styles.selectionTextValue}>
            {filterValuesNumbers[0]}/{max} - {filterValuesNumbers[1]}/{max}
          </span>
        </p>
        <button className={styles.clearButton} onClick={handleClear}>
          clear
        </button>
      </div>
      <div className={styles.rangeContainer}>
        <Slider.Root
          className={styles.sliderRoot}
          defaultValue={[0, max]}
          max={max}
          step={1}
          minStepsBetweenThumbs={1}
          onValueChange={handleRangeChange}
          value={filterValuesNumbers}
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
