defmodule FreshHiring.Accounts do
  @moduledoc """
  The Accounts context.
  """

  import Ecto.{Query, Multi}, warn: false
  alias Ecto.Multi
  alias FreshHiring.Repo
  alias FreshHiring.Emails
  alias FreshHiring.Mailer
  alias FreshHiring.Accounts.Session
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

  def get_user(id), do: Repo.get(User, id)

  def get_user_by(attrs), do: Repo.get_by(User, attrs)

  def create_or_update_user(%{email: email} = u_input, redirect_to) do
    case get_user_by(%{email: email, invalidated: false}) do
      nil ->
        create_user(u_input, redirect_to)

      existing_user ->
        create_session(%{redirect_to: redirect_to, user_id: existing_user.id})
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
    |> Multi.insert(:session, fn %{user: %{id: u_id}} ->
      Session.changeset(%Session{}, %{redirect_to: rt, user_id: u_id})
    end)
    |> Repo.transaction
    |> case do
      {:ok, %{user: user, session: session}} ->
        # Send welcome email to new user
        Emails.welcome_email(session, user) |> Mailer.deliver_now
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

  alias FreshHiring.Accounts.Session

  @doc """
  Returns the list of accounts_sessions.

  ## Examples

      iex> list_accounts_sessions()
      [%AuthToken{}, ...]

  """
  def list_accounts_sessions do
    Repo.all(Session)
  end

  def get_session(id), do: Repo.get(Session, id)

  @doc """
  Gets a single session.

  Raises `Ecto.NoResultsError` if the Session does not exist.

  ## Examples

      iex> get_session!(123)
      %AuthToken{}

      iex> get_session!(456)
      ** (Ecto.NoResultsError)

  """
  def get_session!(id), do: Repo.get!(Session, id)

  def get_session_by(attrs), do: Repo.get_by(Session, attrs)

  @doc """
  Creates a session.

  ## Examples

      iex> create_session(%{field: value})
      {:ok, %AuthToken{}}

      iex> create_session(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_session(attrs \\ %{}) do
    %Session{}
    |> Session.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a session.

  ## Examples

      iex> update_session(session, %{field: new_value})
      {:ok, %Session{}}

      iex> update_session(session, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_session(%Session{} = session, attrs) do
    session
    |> Session.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Session.

  ## Examples

      iex> delete_session(session)
      {:ok, %AuthToken{}}

      iex> delete_session(session)
      {:error, %Ecto.Changeset{}}

  """
  def delete_session(%Session{} = session) do
    Repo.delete(session)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking session changes.

  ## Examples

      iex> change_session(session)
      %Ecto.Changeset{source: %Session{}}

  """
  def change_auth_token(%Session{} = session) do
    Session.changeset(session, %{})
  end
end
