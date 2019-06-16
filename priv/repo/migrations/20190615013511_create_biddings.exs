defmodule FreshHiring.Repo.Migrations.CreateBiddings do
  use Ecto.Migration

  def change do
    create table(:biddings) do
      add :user_id, references(:accounts_users, on_delete: :nothing)
      add :organisation_id, references(:organisations_capital_raises, on_delete: :nothing)
      add :amount_paid, :float
      add :shares_price, :float
      add :options_ratio_numerator, :integer
      add :options_ratio_denominator, :integer
      add :options_strike_price, :float

      timestamps()
    end

    create index(:biddings, [:user_id, :organisation_id])
    create index(:biddings, [:organisation_id, :user_id])
  end
end
