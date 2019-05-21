defmodule FreshHiring.Accounts.AuthToken do
  use Ecto.Schema
  import Ecto.Changeset

  alias FreshHiring.Accounts.User
  alias FreshHiring.{Endpoint}

  @auth_fields [
    :invalidated,
    :redirect_to,
    :token,
    :used_at,
    :user_id,
  ]

  @req_fields [
    :redirect_to,
    :token,
    :user_id,
  ]

  schema "accounts_auth_tokens" do
    field :invalidated, :boolean, default: false
    field :redirect_to, :string
    field :token, :string
    field :used_at, :naive_datetime

    belongs_to(:user, User, foreign_key: :user_id)

    timestamps()
  end

  @doc false
  def changeset(auth_token, attrs) do
    auth_token
    |> cast(attrs, @auth_fields)
    |> validate_required(@req_fields)
    |> generate_token()
  end

  defp generate_token(changeset) do
    if changeset.valid? and is_nil(changeset.changes[:token]) do
      changeset
      |> put_change(:token, Phoenix.Token.sign(Endpoint, "user", changeset.changes[:user_id]))
    else
      changeset
    end
  end
end
