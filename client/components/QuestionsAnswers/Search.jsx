import React, {useState, useEffect} from 'react';

// Sub-component: Search Bar
const Search = ({handleSearch}) => {
  // Set search state to an empty string
  const [search, setSearch] = useState('');

  const handleSubmit = ((e) => {
    e.preventDefault();
    console.log('Submit search for: ', search);
    handleSearch(search);
    setSearch('');
  });

  return (
    <form onSubmit={handleSubmit}>
      <input id='search' onChange={((e) => setSearch(e.target.value))} value = {search} placeholder ='Have a question? Search for answers...' />
      <button type='submit'>🔍︎</button>
    </form>
  );
};

export default Search;