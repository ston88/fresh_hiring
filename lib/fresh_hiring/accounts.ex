defmodule FreshHiring.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.{Query, Multi}, warn: false
  alias Ecto.Multi
  alias FreshHiring.Repo
  alias FreshHiring.Emails
  alias FreshHiring.Mailer
  alias FreshHiring.Accounts.AuthToken
  alias FreshHiring.Accounts.User

  @doc """
  Returns the list of accounts_users.

  ## Examples

      iex> list_accounts_users()
      [%User{}, ...]

  """
  def list_accounts_users do
    Repo.all(User)
  end

  def get_user(id), do: Repo.get(User, id)

  @doc """
  Gets a single user.

  Raises `Ecto.NoResultsError` if the User does not exist.

  ## Examples

      iex> get_user!(123)
      %User{}

      iex> get_user!(456)
      ** (Ecto.NoResultsError)

  """
  def get_user!(id), do: Repo.get!(User, id)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def create_or_update_user(%{email: email} = u_input, redirect_to) do
    case get_user_by(%{email: email, invalidated: false}) do
      nil ->
        create_user(u_input, redirect_to)

      existing_user ->
        create_auth_token(%{email: email, redirect_to: redirect_to, user_id: existing_user.id})
    end
  end

  @doc """
  Creates a user.

  ## Examples

      iex> create_user(%{field: value})
      {:ok, %User{}}

      iex> create_user(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_user(attrs, rt) do
    Multi.new()
    |> Multi.insert(:user, User.changeset(%User{}, attrs))
    |> Multi.insert(:auth_token, fn %{user: %{email: email, id: id}} ->
      AuthToken.changeset(%AuthToken{}, %{email: email, redirect_to: rt, user_id: id})
    end)
    |> Repo.transaction
    |> case do
      {:ok, %{user: user, auth_token: at}} ->
        # Send welcome email to new user
        Emails.welcome_email(user.email, user.name, at.token) |> Mailer.deliver_now
        # Return User
        {:ok, user}

      {:error, ops, res, _} ->
        {:error, "Error signing up user: #{ops} - #{inspect res}"}
    end
  end

  @doc """
  Updates a user.

  ## Examples

      iex> update_user(user, %{field: new_value})
      {:ok, %User{}}

      iex> update_user(user, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_user(%User{} = user, attrs) do
    user
    |> User.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a User.

  ## Examples

      iex> delete_user(user)
      {:ok, %User{}}

      iex> delete_user(user)
      {:error, %Ecto.Changeset{}}

  """
  def delete_user(%User{} = user) do
    Repo.delete(user)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking user changes.

  ## Examples

      iex> change_user(user)
      %Ecto.Changeset{source: %User{}}

  """
  def change_user(%User{} = user) do
    User.changeset(user, %{})
  end

  alias FreshHiring.Accounts.AuthToken

  @doc """
  Returns the list of accounts_auth_tokens.

  ## Examples

      iex> list_accounts_auth_tokens()
      [%AuthToken{}, ...]

  """
  def list_accounts_auth_tokens do
    Repo.all(AuthToken)
  end

  def get_auth_token(id), do: Repo.get(AuthToken, id)

  @doc """
  Gets a single auth_token.

  Raises `Ecto.NoResultsError` if the Auth token does not exist.

  ## Examples

      iex> get_auth_token!(123)
      %AuthToken{}

      iex> get_auth_token!(456)
      ** (Ecto.NoResultsError)

  """
  def get_auth_token!(id), do: Repo.get!(AuthToken, id)

  def get_auth_token_by(attrs), do: Repo.get_by(AuthToken, attrs)

  @doc """
  Creates a auth_token.

  ## Examples

      iex> create_auth_token(%{field: value})
      {:ok, %AuthToken{}}

      iex> create_auth_token(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_auth_token(attrs \\ %{}) do
    %AuthToken{}
    |> AuthToken.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a auth_token.

  ## Examples

      iex> update_auth_token(auth_token, %{field: new_value})
      {:ok, %AuthToken{}}

      iex> update_auth_token(auth_token, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_auth_token(%AuthToken{} = auth_token, attrs) do
    auth_token
    |> AuthToken.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a AuthToken.

  ## Examples

      iex> delete_auth_token(auth_token)
      {:ok, %AuthToken{}}

      iex> delete_auth_token(auth_token)
      {:error, %Ecto.Changeset{}}

  """
  def delete_auth_token(%AuthToken{} = auth_token) do
    Repo.delete(auth_token)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking auth_token changes.

  ## Examples

      iex> change_auth_token(auth_token)
      %Ecto.Changeset{source: %AuthToken{}}

  """
  def change_auth_token(%AuthToken{} = auth_token) do
    AuthToken.changeset(auth_token, %{})
  end
end
