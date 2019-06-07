defmodule FreshHiringWeb.Authentication do
  import Plug.Conn

  alias FreshHiring.Accounts

  def init(opts), do: opts

  def call(conn, _opts) do
    case get_session(conn, :user_id) do
      nil ->
        conn

      user_id ->
        user = Accounts.get_user(user_id)

        conn
        |> assign(:current_user, user)
        |> Absinthe.Plug.put_options(
          context: %{
            current_user: user,
          }
        )
    end
  end

  def login(conn, user) do
    conn
    |> put_session(:user_id, user.id)
    |> assign(:current_user, user)
    |> configure_session(renew: true)
  end

  def logout(conn) do
    conn
    |> configure_session(drop: true)
    |> delete_resp_cookie("fresh_hiring_remember_session")
    |> delete_resp_cookie("fresh_hiring_remember_auth")
  end

  def refresh(conn, session, user) do
    case Accounts.update_session(session, %{auth_token: Ecto.UUID.generate()}) do
      {:ok, updated_session} ->
        conn
        |> configure_session(renew: true)
        |> put_session(:user_id, user.id)
        |> assign(:current_user, user)
        |> put_resp_cookie(
          "fresh_hiring_remember_auth",
          Phoenix.Token.sign(conn, "fresh_hiring", updated_session.auth_token),
          http_only: true,
          max_age: 7_776_000
        )
        |> Absinthe.Plug.put_options(
          context: %{
            current_user: user,
          }
        )

      {:error, _error} ->
        conn
    end
  end

  def remember_me(conn) do
    with session_token when not is_nil(session_token) <- conn.cookies["fresh_hiring_remember_session"],
      signed_auth_token when not is_nil(signed_auth_token) <- conn.cookies["fresh_hiring_remember_auth"],
      {:ok, auth_token} <- Phoenix.Token.verify(conn, "fresh_hiring", signed_auth_token, max_age: 7_776_000),
      session when not is_nil(session) <- Accounts.get_session_by(%{authenticated: true, auth_token: auth_token, token: session_token, invalidated: false}),
      user when not is_nil(user) <- Accounts.get_user(session.user_id) do
      conn
      |> refresh(session, user)
    else
      _ ->
        conn
    end
  end
end
