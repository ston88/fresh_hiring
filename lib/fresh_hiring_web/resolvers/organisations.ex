defmodule FreshHiringWeb.Resolvers.Organisations do
  use FreshHiringWeb, :type

  alias FreshHiring.Organisations
  alias Absinthe.Relay.Connection

  def capital_raises_cursor(_parents, args, _context) do
    options = Map.get(args, :options, %{})

    connection_result =
      options
      |> Organisations.capital_raises_query()
      |> Connection.from_query(&Organisations.run_query/1, args)

    with {:ok, connection} <- connection_result do
      {:ok, %{
        edges: connection.edges,
        page_info: connection.page_info,
        options: options
      }}
    else
      {:error, error} ->
        {:error, error}
    end
  end

  def find_capital_raise(_parents, %{id: id}, _context) do
    case Organisations.get_capital_raise(id) do
      nil ->
        {:ok, nil}

      capital_raise ->
        {:ok, capital_raise}
    end
  end
end
