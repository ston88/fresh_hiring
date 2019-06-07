defmodule FreshHiringWeb.UserSocket do
  use Phoenix.Socket

  use Absinthe.Phoenix.Socket,
    schema: FreshWeb.Schema

  alias FreshHiring.Accounts

  ## Channels
  # channel "room:*", FreshHiringWeb.RoomChannel

  # Socket params are passed from the client and can
  # be used to verify and authenticate a user. After
  # verification, you can put default assigns into
  # the socket that will be set for all channels, ie
  #
  #     {:ok, assign(socket, :user_id, verified_user_id)}
  #
  # To deny connection, return `:error`.
  #
  # See `Phoenix.Token` documentation for examples in
  # performing token verification on connect.
  def connect(%{"token" => token}, socket) do
    case Phoenix.Token.verify(
           FreshWeb.Endpoint,
           "fresh_hiring",
           token,
           max_age: 86_400
         ) do
      {:ok, user_id} ->
        socket =
          Absinthe.Phoenix.Socket.put_options(
            socket,
            context: %{current_user: Accounts.get_user(user_id)}
          )

        {:ok, socket}

      {:error, _error} ->
        {:ok, socket}
    end
  end

  # Socket id's are topics that allow you to identify all sockets for a given user:
  #
  #     def id(socket), do: "user_socket:#{socket.assigns.user_id}"
  #
  # Would allow you to broadcast a "disconnect" event and terminate
  # all active sockets and channels for a given user:
  #
  #     FreshHiringWeb.Endpoint.broadcast("user_socket:#{user.id}", "disconnect", %{})
  #
  # Returning `nil` makes this socket anonymous.
  def id(_socket), do: nil
end
