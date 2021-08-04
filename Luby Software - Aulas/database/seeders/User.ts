import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    const uniqueKey = 'eMail'

    await User.updateOrCreateMany(uniqueKey, [
      {
        eMail: 'sofia@mail.com',
        password: '123456',
      },
      {
        eMail: 'ana@Mail.com',
        password: '654321',
      },
    ])
  }
}
