import auth from 'App/Models/Auth'

declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: LucidProviderContract<typeof auth>,
      config: LucidProviderConfig<typeof auth>,
    },
  }

  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>,
      config: OATGuardConfig<'user'>,
    }
  }
}
