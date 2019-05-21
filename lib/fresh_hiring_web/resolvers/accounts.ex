defmodule FreshHiringWeb.Resolvers.Accounts do
  use FreshHiringWeb, :type

  alias FreshHiring.Accounts

  def create_auth_token(_parents, %{email: email, redirect_to: rt}, _context) do
    case Accounts.get_user_by(%{email: email, invalidated: false}) do
      nil ->
        {:error, "You don't have an account with Fresh"}

      user ->
        case Accounts.create_auth_token(%{email: email, redirect_to: rt, user_id: user.id}) do
          {:ok, _auth_token} ->
            {:ok, "Check your email, We've sent you a magic link to login."}

          {:error, _reason} ->
            {:error, "Something went wrong creating your login link"}
        end
    end
  end

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
end
