import PropTypes from 'prop-types'

export function PostSorting({
  fields = [],
  value,
  onChange,
  orderValue,
  onChangeOrder,
}) {
  return (
    <div>
      <div>
        <label htmlFor='sort-by'>Sort by: </label>
        <select
          name='sortBy'
          id='sortBy'
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor='sortOrder'>Sort Order: </label>
        <select
          name='sortOrder'
          id='sortOrder'
          value={orderValue}
          onChange={(e) => onChangeOrder(e.target.value)}
        >
          <option value={'ascending'}>ascending</option>
          <option value={'descending'}>descending</option>
        </select>
      </div>
    </div>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  orderValue: PropTypes.string.isRequired,
  onChangeOrder: PropTypes.func.isRequired,
}
