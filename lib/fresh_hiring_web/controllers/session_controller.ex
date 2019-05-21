defmodule FreshHiringWeb.SessionController do
  use FreshHiringWeb, :controller

  alias FreshHiring.Accounts

  def show(conn, %{"token" => token}) do
    case Accounts.verify_auth_token(token) do
      {:ok, %{auth_token: at, user: user}} ->
        conn
        |> assign(:current_user, user)
        |> put_session(:user_id, user.id)
        |> configure_session(renew: true)
        |> redirect(to: at.redirect_to)

      {:error, _reason} ->
        conn
        |> put_flash(:error, "The login token is invalid.")
        |> redirect(to: "/")
    end
  end

  def delete(conn, _params) do
    conn
    |> assign(:current_user, nil)
    |> configure_session(drop: true)
    |> delete_session(:user_id)
    |> put_flash(:info, "You logged out successfully.")
    |> redirect(to: "/")
  end
end
