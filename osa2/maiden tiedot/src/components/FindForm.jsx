const FindForm = ({ filter, handleFindFormChange }) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <div>
          find countries <input 
          value={filter || ''}
          onChange={handleFindFormChange}
          />
        </div>
    </form>
  )
}

export default FindForm