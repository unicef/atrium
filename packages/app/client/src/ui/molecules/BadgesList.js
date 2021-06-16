import React from 'react'
import Badge from './Badge'

const badges = { 1: 10, 2: 25, 3: 50, 4: 100, 5: 250, 6: 500, 7: 1000 }

function BadgesList({ start, end }) {
  return (
    <>
      {Object.keys(badges)
        .slice(start, end)
        .map(key => (
          <Badge badge={badges[key]} level={key} last={+key === end} />
        ))}
    </>
  )
}

export default BadgesList
