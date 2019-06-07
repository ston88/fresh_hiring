defmodule FreshHiring.Repo.Migrations.FixingMinAmountForCapitalRaise do
  use Ecto.Migration

  def change do
    rename table(:organisations_capital_raises), :min_amonut, to: :min_amount
  end
end
