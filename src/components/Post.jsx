import PropTypes from 'prop-types'

export function Post({ title, content, author }) {
  return (
    <article>
      <h3>{title}</h3>
      <div>{content}</div>
      {author && (
        <em>
          <br />
          Written by <strong>{author}</strong>
        </em>
      )}
    </article>
  )
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  author: PropTypes.string,
}
