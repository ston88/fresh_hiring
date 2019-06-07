defmodule FreshHiring.Organisations.CapitalRaise do
  use Ecto.Schema
  import Ecto.Changeset

  @raise_fields [
    :banner,
    :bids_due,
    :bidding_open,
    :bidding_close,
    :gics,
    :halt_price,
    :key,
    :logo,
    :market_cap,
    :max_amount,
    :min_amount,
    :name,
    :options_available,
    :options_expiration,
    :options_ratio_numerator,
    :options_ratio_denominator,
    :options_strike_price,
    :price,
    :summary,
    :website
  ]

  @req_fields [
    :bids_due,
    :bidding_open,
    :bidding_close,
    :halt_price,
    :key,
    :name,
    :price,
  ]

  schema "organisations_capital_raises" do
    field :banner, :string
    field :bids_due, :naive_datetime
    field :bidding_open, :naive_datetime
    field :bidding_close, :naive_datetime
    field :gics, :string
    field :halt_price, :float
    field :instrument, :string
    field :key, :string
    field :logo, :string
    field :market_cap, :float
    field :max_amount, :float
    field :min_amount, :float
    field :name, :string
    field :options_available, :boolean
    field :options_expiration, :integer
    field :options_ratio_numerator, :integer, default: 1
    field :options_ratio_denominator, :integer, default: 1
    field :options_strike_price, :float
    field :price, :float
    field :summary, :string
    field :type, :string
    field :website, :string

    timestamps()
  end

  @doc false
  def changeset(capital_raise, attrs) do
    capital_raise
    |> cast(attrs, @raise_fields)
    |> validate_required(@req_fields)
    |> validate_inclusion(:instrument, [
      "equity"
    ])
    |> validate_inclusion(:type, [
      "placement"
    ])
  end
end
