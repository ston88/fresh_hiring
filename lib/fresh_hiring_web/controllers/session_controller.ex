defmodule FreshHiringWeb.SessionController do
  use FreshHiringWeb, :controller

  alias FreshHiring.Accounts
  alias FreshHiring.Emails
  alias FreshHiring.Mailer

  alias FreshHiringWeb.Authentication

  def login(conn, %{"email" => email, "redirect_to" => redirect_to}) do
    with user when not is_nil(user) <- Accounts.get_user_by(%{email: email}),
      {:ok, session} <- Accounts.create_session(%{redirect_to: redirect_to, user_id: user.id}) do
      # Send verify Auth Token Email
      Emails.session_verify(session, user) |> Mailer.deliver_now
      # Return Session
      conn
      |> render("login.json", %{
        success: true,
        session_token: session.token
      })
    else
      _ ->
        conn
        |> put_status(401)
        |> render("error.json", %{error: "Please sign up"})
    end
  end

  def logout(conn, _params) do
    conn
    |> Authentication.logout()
    |> render("logout.json", %{ success: true })
  end

  def verify(conn, %{"token" => token}) do
    with session when not is_nil(session) <-
      Accounts.get_session_by(%{authenticated: false, token: token, invalidated: false}),
      {:ok, updated_session} <- Accounts.update_session(session, %{authenticated: true}),
      user when not is_nil(user) <- Accounts.get_user(updated_session.user_id) do
      # Return
      conn
      |> Authentication.login(user)
      |> put_resp_cookie(
        "fresh_hiring_remember_session",
        updated_session.token,
        http_only: true,
        max_age: 7_776_000
      )
      |> put_resp_cookie(
        "fresh_hiring_remember_auth",
        Phoenix.Token.sign(conn, "fresh_hiring", updated_session.auth_token),
        http_only: true,
        max_age: 7_776_000
      )
      |> put_status(302)
      |> redirect(to: updated_session.redirect_to)

    else
      _ ->
        conn
        |> put_status(302)
        |> redirect(to: "/verfied?confirm=failure")
    end
  end
end
