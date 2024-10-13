import { User } from '~/models/User'

class UsersService {
  async findUserById(user_id: string): Promise<User | null> {
    try {
      const user = await User.findByPk(user_id) // Fetches user by primary key (id)
      return user
    } catch (error) {
      console.error('Error fetching user:', error)
      return null
    }
  }
}

const usersService = new UsersService()
export default usersService
