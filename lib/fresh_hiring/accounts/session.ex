defmodule FreshHiring.Accounts.Session do
  use Ecto.Schema
  import Ecto.Changeset

  alias FreshHiring.Accounts.User
  alias FreshHiring.{Endpoint}

  @auth_fields [
    :authenticated,
    :auth_token,
    :invalidated,
    :redirect_to,
    :token,
    :user_id,
  ]

  @req_fields [
    :redirect_to,
    :user_id,
  ]

  schema "accounts_sessions" do
    field(:authenticated, :boolean, default: false)
    field(:auth_token, Ecto.UUID, autogenerate: true)
    field :invalidated, :boolean, default: false
    field :redirect_to, :string
    field(:token, Ecto.UUID, autogenerate: true)

    belongs_to(:user, User, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(auth_token, attrs) do
    auth_token
    |> cast(attrs, @auth_fields)
    |> validate_required(@req_fields)
    |> unique_constraint(:token)
  end
end
