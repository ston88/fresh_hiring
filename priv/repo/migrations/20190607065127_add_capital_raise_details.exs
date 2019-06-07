defmodule FreshHiring.Repo.Migrations.AddCapitalRaiseDetails do
  use Ecto.Migration

  def change do
    alter table(:organisations_capital_raises) do
      add :instrument, :string
      add :type, :string
    end
  end
end
