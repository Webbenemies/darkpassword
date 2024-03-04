import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Trying = () => {
    const [selectedId, setSelectedId] = useState([])
    const items = [
        {
            id:Math.random(),
            subtitle: "subhro",
            title:" sahe"
        },
        {
            id:Math.random(),
            subtitle: "subh222ro",
            title:" sah222e"
        },
        {
            id:Math.random(),
            subtitle: "sub333hro",
            title:" sah3333e"
        }
    ]
  return (
    <>
    {items.map(item => (
        <motion.div key={item.id} layoutId={item.id} onClick={() => setSelectedId(item)}>
          <motion.h5>{item.subtitle}</motion.h5>
          <motion.h2>{item.title}</motion.h2>
        </motion.div>
      ))}

<AnimatePresence>
  {selectedId && (
    <motion.div layoutId={selectedId.id}>
      <motion.h5>{selectedId.title}</motion.h5>
      <motion.h2>{selectedId.subtitle}</motion.h2>
      <motion.button onClick={() => setSelectedId(null)} >ss</motion.button>
    </motion.div>
  )}
</AnimatePresence>
      
      </>
  )
}

export default Trying