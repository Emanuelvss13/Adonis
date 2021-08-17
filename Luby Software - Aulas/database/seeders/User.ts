import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'sofia@mail.com',
        password: '123456',
      },
      {
        email: 'ana@Mail.com',
        password: '654321',
      },
    ])
  }
}
