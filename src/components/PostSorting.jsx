import PropTypes from 'prop-types'

export function PostSorting({ fields = [] }) {
  return (
    <div>
      <div>
        <label htmlFor='sort-by'>Sort by: </label>
        <select name='sortBy' id='sortBy'>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='sortOrder'>Sort Order: </label>
        <select name='sortOrder' id='sortOrder'>
          <option value={'ascending'}>ascending</option>
          <option value={'descending'}>descending</option>
        </select>
      </div>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
}
