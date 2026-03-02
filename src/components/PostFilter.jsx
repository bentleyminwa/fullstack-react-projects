import PropTypes from 'prop-types'

export function PostFilter({ field, value, onChange }) {
  return (
    <div>
      <label htmlFor={`filter-${field}`}>Filter by {field}: </label>
      <input
        id={`filter-${field}`}
        name={`filter-${field}`}
        type='text'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='border border-gray-400 outline-none p-2'
      />
    </div>
  )
}

PostFilter.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}
