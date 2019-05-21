defmodule FreshHiring.Repo.Migrations.CreateAccountsAuthTokens do
  use Ecto.Migration

  def change do
    create table(:accounts_auth_tokens) do
      add :invalidated, :boolean, default: false
      add :redirect_to, :string
      add :token, :string
      add :used_at, :naive_datetime
      add :user_id, references(:accounts_users, on_delete: :nothing)

      timestamps()
    end

    create index(:accounts_auth_tokens, [:user_id])
    create unique_index(:accounts_auth_tokens, [:token])
  end
end
