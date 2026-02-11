import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <td></td>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>

          {
            users.map((user) => {
              return (
                <tr key={user.username}>
                  <td>
                    <Link to={`/users/${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>
                    {user.blogs.length}
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </>
  )
}

export default Users