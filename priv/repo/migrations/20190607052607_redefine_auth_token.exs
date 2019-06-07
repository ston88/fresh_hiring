defmodule FreshHiring.Repo.Migrations.RedefineAuthToken do
  use Ecto.Migration

  def change do
    execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")

    alter table(:accounts_auth_tokens) do
      add :authenticated, :boolean, default: false
      add :auth_token, :uuid, default: fragment("uuid_generate_v4()")
      modify :token, :uuid, default: fragment("uuid_generate_v4()")
      remove :used_at
    end

    create unique_index(:accounts_auth_tokens, [:token])

    create index(:accounts_sessions, [:user_id])
  end
end
