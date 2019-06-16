defmodule FreshHiring.Organisations.Bidding do
  use Ecto.Schema
  import Ecto.Changeset

  alias FreshHiring.Accounts.User
  alias FreshHiring.Organisations.CapitalRaise

  @bidding_fields [
    :user_id,
    :organisation_id,
    :amount_paid,
    :shares_price,
    :options_ratio_numerator,
    :options_ratio_denominator,
    :options_strike_price
  ]

  @req_fields [
    :user_id,
    :organisation_id,
    :amount_paid,
    :shares_price
  ]

  schema "biddings" do
    field :amount_paid, :float
    field :shares_price, :float
    field :options_ratio_numerator, :integer
    field :options_ratio_denominator, :integer
    field :options_strike_price, :float

    belongs_to(:user, User, foreign_key: :user_id)
    belongs_to(:organisation, CapitalRaise, foreign_key: :organisation_id, references: :id)

    timestamps()
  end

  @doc false
  def changeset(bidding, attrs) do
    bidding
    |> cast(attrs, @bidding_fields)
    |> validate_required(@req_fields)
  end
end
