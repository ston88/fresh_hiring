defmodule FreshHiringWeb.Resolvers.Accounts do
  use FreshHiringWeb, :type

  alias FreshHiring.Accounts

  def create_user(_parents, %{user: u_input, redirect_to: rt}, _context) do
    case Accounts.create_or_update_user(u_input, rt) do
      {:ok, user} ->
        {:ok, user}

      {:error, error} ->
        {:error, error}
    end
  end

  def find_user(_parents, _args, %{context: %{current_user: %{id: u_id}}}) do
    case Accounts.get_user(u_id) do
      nil ->
        {:ok, nil}

      user ->
        {:ok, user}
    end
  end
  def find_user(_, _, _), do: {:ok, nil}

  def update_user(_parents, %{user_id: u_id, user: u_input}, %{context: %{current_user: user}}) do
    if user.id == u_id do
      Accounts.update_user(user, u_input)
    else
      {:error, "can't update the user"}
    end
  end

  def update_user(_, _, _), do: {:ok, nil}
end
