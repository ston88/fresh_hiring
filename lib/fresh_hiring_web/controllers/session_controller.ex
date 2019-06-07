defmodule FreshHiringWeb.SessionController do
  use FreshHiringWeb, :controller

  alias FreshHiring.Accounts

  def login(conn, %{"email" => email, "redirect_to" => redirect_to}) do
    with user when not is_nil(user) <- Accounts.get_user_by(%{email: email}),
      {:ok, auth_token} <-
        Accounts.create_auth_token(%{
          redirect_to: redirect_to,
          user_id: user.id
        }) do
      # Send verify Auth Token EMail
      FreshHiring.Emails.auth_token_verify(auth_token, user)
      # Return Session
      conn
      |> render("login.json", %{
        success: true,
        auth_token: auth_token.token
      })
    else
      _ ->
        conn
        |> put_status(401)
        |> render("error.json", %{error: "Please sign up"})
    end
  end

  def delete(conn, _params) do
    conn
    |> Authentication.logout()
    |> put_flash(:info, "You logged out successfully.")
    |> redirect(to: "/")
  end

  def verify(conn, %{"token" => token}) do
    with auth_token when not is_nil(auth_token) <-
      Accounts.get_auth_by(%{
        authenticated: false,
        token: token,
        invalidated: false
      }),
      {:ok, updated_auth_token} <- Accounts.update_auth_token(auth_token, %{authenticated: true}),
      user when not is_nil(user) <- Accounts.get_user(updated_auth_token.user_id) do
      # Updated Subscription
      Absinthe.Subscription.publish(
        FreshHiringWeb.Endpoint,
        updated_auth_token,
        auth_token_updated: updated_auth_token.token
      )
      # Return
      conn
      |> Authentication.login(user)
      |> put_resp_cookie(
        "fresh_hiring_remember_session",
        updated_auth_token.token,
        http_only: true,
        max_age: 7_776_000
      )
      |> put_resp_cookie(
        "fresh_hiring_remember_auth",
        Phoenix.Token.sign(conn, "fresh_hiring", updated_auth_token.auth_token),
        http_only: true,
        max_age: 7_776_000
      )
      |> put_status(302)
      |> redirect(to: updated_auth_token.redirect_to)

    else
      _ ->
        conn
        |> put_status(302)
        |> redirect(to: "/verfied?confirm=failure")
    end
  end
end
