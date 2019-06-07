defmodule FreshHiring.Repo.Migrations.CreateOrganisationsCapitalRaises do
  use Ecto.Migration

  def change do
    create table(:organisations_capital_raises) do
      add :allocation_available, :boolean
      add :banner, :string
      add :bids_due, :naive_datetime
      add :bidding_open, :naive_datetime
      add :gics, :string
      add :halt_price, :float
      add :key, :string
      add :logo, :string
      add :market_cap, :float
      add :max_amount, :float
      add :min_amonut, :float
      add :name, :string
      add :options_available, :boolean
      add :options_expiration, :integer
      add :options_ratio_numerator, :integer
      add :options_ratio_denominator, :integer
      add :options_strike_price, :float
      add :price, :float
      add :summary, :text
      add :website, :string

      timestamps()
    end

  end
end
