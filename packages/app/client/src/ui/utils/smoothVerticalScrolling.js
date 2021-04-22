const smoothVerticalScrolling = ({ element, time, otherFixedElementsHeight = 0 }) => {
  const elementTopPosition = element.getBoundingClientRect().top
  const headerHeight = 50
  const extraAmount = headerHeight + otherFixedElementsHeight
  const scrollAmount = elementTopPosition - extraAmount
  
  const scrollTreshholdAmount = scrollAmount / 100
  
  let curTime = 0;
  while (curTime <= time) {
    window.setTimeout(() => {
      window.scrollBy(0, scrollTreshholdAmount)
    }, curTime)
    curTime += time / 100
  }
}

export default smoothVerticalScrolling
