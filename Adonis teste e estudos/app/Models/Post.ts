import auth from 'App/Models/Auth';
import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne} from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  @hasOne(() => auth, {
    foreignKey: 'user_id'
  })
  public auth: HasOne<typeof auth>

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public url: string

  @column()
  public title: string

  @column()
  public description: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
