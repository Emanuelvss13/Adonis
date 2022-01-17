import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasOne,
  hasOne
} from '@ioc:Adonis/Lucid/Orm'
import ApiToken from './ApiToken';

export default class auth extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (auth: auth) {
    if (auth.$dirty.password) {
      auth.password = await Hash.make(auth.password)
    }
  }

  @hasOne(() => ApiToken, {
    foreignKey: 'apiTokenUserId', // defaults to userId
  })
  public ApiToken: HasOne<typeof ApiToken>
}
