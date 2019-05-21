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
        |> Absinthe.Plug.put_options(context: %{
          current_user: user,
        })
    end
  end
end
