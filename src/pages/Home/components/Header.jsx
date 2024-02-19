import React,{useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import {AnimatePresence, motion} from "framer-motion"

export default function Header({searchKeyword, setSearchKeyword, handleFilter}) {
const [showFilter, setShowFilter]  =useState(false)
const handleToggleFilter = ()=> {
    setShowFilter(!showFilter)
}

const handleSearch=(e)=> {
    setSearchKeyword(e.target.value)
}
  return (
    <header className='flex justify-between relative '>
    <div onClick={handleToggleFilter} className={`font-medium text-blue-950 flex items-center gap-2`}> All Reviews <FontAwesomeIcon  className={`text-blue-950 ${showFilter? 'rotate-180': undefined}  transition-all duration-500`} icon={faCaretDown}/></div>
    {/* Filter Properties */}

    
        <AnimatePresence>

      {
        showFilter &&     <motion.div
          
        initial={{
            opacity: 0,
            scale: 0.75,
        }}
        animate={{
            opacity: 1,
            scale: 1,
            transition: {
                ease: "easeOut",
                duration: 0.15,
            },
        }}
        exit={{
            opacity: 0,
            scale: 0.75,
            transition: {
                ease: "easeIn",
                duration: 0.15,
            },
        }}
        className='absolute w-24 top-0 mt-6  bg-white'>
        <ul className='p-2 flex flex-col gap-2'>
            <li onClick={()=>{ handleFilter("today"); handleToggleFilter()   }}>Today</li>
            <div className='w-full h-[0.5px] bg-gray-300'></div>
            <li onClick={()=>{ handleFilter("yesterday"); handleToggleFilter() }}>Yesterday</li>
            <div className='w-full h-[0.5px] bg-gray-300'></div>
            <li onClick={()=>{ handleFilter("this week"); handleToggleFilter()}}>This week</li>
            <div className='w-full h-[0.5px] bg-gray-300'></div>
            <li>Earlier</li>
        </ul>
        </motion.div>
    
      }
        </AnimatePresence>
   

    
    <div className='relative flex items-center'>
        <FontAwesomeIcon  icon={faMagnifyingGlass} className='absolute right-0 p-1 text-gray-200  '/>

    <input onChange={handleSearch} value={searchKeyword} className='rounded-lg px-2 py-1 outline-none shadow-sm' type='text' placeholder='Search vendor' />
    </div>
   </header>
  )
}
