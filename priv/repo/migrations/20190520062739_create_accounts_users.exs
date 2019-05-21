defmodule FreshHiring.Repo.Migrations.CreateAccountsUsers do
  use Ecto.Migration

  def change do
    create table(:accounts_users) do
      add :email, :string
      add :invalidated, :boolean, default: false
      add :name, :string

      timestamps()
    end

    create unique_index(:accounts_users, [:email],
      name: :unique_accounts_users_constraint, where: "invalidated IS NOT true")
  end
end
