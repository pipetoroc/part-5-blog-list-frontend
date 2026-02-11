import { useEffect, useState } from 'react'
import { getAllUsers } from '../services/users'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    getAllUsers().then(users => {
      setUsers(users)
    })
  }, [])

  console.log(users, 'USERS')
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
                    {user.name}
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