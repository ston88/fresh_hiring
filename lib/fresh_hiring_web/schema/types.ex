defmodule FreshHiringWeb.Schema.Types do
  use FreshHiringWeb, :type


  #########################################################################
  # User Types                                                            #
  #########################################################################
  input_object :user_input do
    field :email, :string
    field :invalidated, :boolean
    field :name, :string
  end

  object :user do
    field(:id, :id)
    field(:inserted_at, :time)
    field(:updated_at, :time)
    # Default Fields
    field :email, :string
    field :invalidated, :boolean
    field :name, :string
  end


  #########################################################################
  # Capital Raise Types                                                   #
  #########################################################################
  connection node_type: :capital_raise do
    field(:options, :options)

    edge do
      field(:capital_raise, :capital_raise)
    end
  end

  object :capital_raise do
    field(:id, :id)
    field(:inserted_at, :time)
    field(:updated_at, :time)
    # Default Fields
    field :allocation_available, :boolean
    field :banner, :string
    field :bids_due, :time
    field :bidding_open, :time
    field :bidding_close, :time
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
    field :options_ratio_numerator, :integer
    field :options_ratio_denominator, :integer
    field :options_strike_price, :float
    field :price, :float
    field :summary, :string
    field :type, :string
    field :website, :string
  end

  #########################################################################
  # Options Types                                                         #
  #########################################################################
  input_object :options_input do
    field(:count, :integer)
    field(:filters, list_of(:filter_input))
    field(:orders, list_of(:order_input))
  end

  object :options do
    field(:count, :integer)
    field(:filters, list_of(:filter))
    field(:orders, list_of(:order))
  end

  #########################################################################
  # Filter Types                                                          #
  #########################################################################
  input_object :filter_input do
    field(:key, :string)
    field(:value, :string)
  end

  object :filter do
    field(:key, :string)
    field(:value, :string)
  end

  #########################################################################
  # Order Types                                                           #
  #########################################################################
  input_object :order_input do
    field(:key, :string)
    field(:value, :string)
  end

  object :order do
    field(:key, :string)
    field(:value, :string)
  end

  #########################################################################
  # Time                                                                  #
  #########################################################################
  scalar :time, description: "ISOz time" do
    parse(&decode/1)
    serialize(&encode/1)
  end

  defp encode(%NaiveDateTime{} = val), do: Timex.format!(val, "{ISO:Extended:Z}")

  defp decode(%Absinthe.Blueprint.Input.Null{}) do
    {:ok, nil}
  end

  defp decode(%Absinthe.Blueprint.Input.String{value: value}) do
    Timex.parse(value, "{ISO:Extended:Z}")
  end

  #########################################################################
  # Bid Types                                                             #
  #########################################################################
  input_object :bid_input do
    field :amount_paid, :float
    field :shares_price, :float
    field :options_ratio_numerator, :integer
    field :options_ratio_denominator, :integer
    field :options_strike_price, :float
    field :user_id, :id
    field :organisation_id, :id
  end

  object :bid do
    field(:id, :id)
    field(:inserted_at, :time)
    field(:updated_at, :time)
    # Default Fields
    field :amount_paid, :float
    field :shares_price, :float
    field :options_ratio_numerator, :integer
    field :options_ratio_denominator, :integer
    field :options_strike_price, :float
    field :user_id, :id
    field :organisation_id, :id
  end

end
