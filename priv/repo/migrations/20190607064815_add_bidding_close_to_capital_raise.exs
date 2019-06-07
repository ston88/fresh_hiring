defmodule FreshHiring.Repo.Migrations.AddBiddingCloseToCapitalRaise do
  use Ecto.Migration

  def change do
    alter table(:organisations_capital_raises) do
      add :bidding_close, :naive_datetime
    end
  end
end
