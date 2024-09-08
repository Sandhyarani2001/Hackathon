import React, { useState } from 'react'
import HeroSection from '../../Hero section/HeroSection'
import Statistic from '../../Top Statistics Sec/Statistic'
import Challenges from '../../Challenges sec/Challenges'
import Filter from '../../Filter sec/Filter'
import ListPages from '../../List page/ListPages'

function Home() {

  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: null, level: null });

  const handleFilterChange = (status, level) => {
    setFilters({ status, level });
};
  
  return (
    <>
      <HeroSection/>
      <Statistic/>
      <Challenges/>
      <Filter onSearch={setSearchTerm} onFilter={handleFilterChange} />
      <ListPages searchTerm={searchTerm} filters={filters} />
    </>
  )
}

export default Home
