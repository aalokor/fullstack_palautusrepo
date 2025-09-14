const Filter = ({personfilter, handleFilterChange}) => {
  return (
    <div>
        filter shown with: <input 
        value={personfilter} 
        onChange={handleFilterChange}
        />
    </div>
  )
}

export default Filter