defmodule FreshHiring.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset

  alias FreshHiring.Accounts.Session

  @user_fields [:email, :invalidated, :name]

  @req_fields [:email, :name]

  schema "accounts_users" do
    field :email, :string
    field :invalidated, :boolean, default: false
    field :name, :string

    has_many :sessions, Session

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, @user_fields)
    |> validate_required(@req_fields)
    |> validate_email()
  end

  def validate_email(changeset) do
    changeset
    |> validate_length(:email, min: 6, max: 255)
    |> put_lowercase_email()
    |> validate_format(:email, ~r/\A[^@\s]+@[^@\s]+\z/)
    |> unique_constraint(:email)
  end

  def put_lowercase_email(changeset = %Ecto.Changeset{valid?: true, changes: %{email: email}}) do
    change(changeset, %{email: String.downcase(email)})
  end
  def put_lowercase_email(changeset), do: changeset
end
