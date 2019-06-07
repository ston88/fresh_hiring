defmodule FreshHiring.Repo.Migrations.RedefineAuthToken do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

    alter table(:accounts_auth_tokens) do
      add :authenticated, :boolean, default: false
      add :auth_token, :uuid, default: fragment("uuid_generate_v4()")
      remove :token
      add :token, :uuid, default: fragment("uuid_generate_v4()")
      remove :used_at
    end

    rename table(:accounts_auth_tokens), to: table(:accounts_sessions)
  end
end
