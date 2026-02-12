const Comments = ({ comments }) => {
  console.log(comments)
  return (
    <>
      <h2>comments</h2>
      <ul>
        {
          comments.map(comment => <li key={comment}>
            {comment}
          </li>
          )
        }
      </ul>
    </>
  )
}

export default Comments