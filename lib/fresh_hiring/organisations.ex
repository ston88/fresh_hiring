defmodule FreshHiring.Organisations do
  @moduledoc """
  The Organisations context.
  """

  import Ecto.Query, warn: false
  alias FreshHiring.Repo

  alias FreshHiring.Organisations.CapitalRaise

  ## General Functions ##
  def run_query(query) do
    Repo.all(query)
  end

  @doc """
  Returns the list of organisations_capital_raises.

  ## Examples

      iex> list_organisations_capital_raises()
      [%CapitalRaise{}, ...]

  """
  def list_organisations_capital_raises do
    Repo.all(CapitalRaise)
  end

  @doc """
  Gets a single capital_raise.

  Raises `Ecto.NoResultsError` if the Capital raise does not exist.

  ## Examples

      iex> get_capital_raise!(123)
      %CapitalRaise{}

      iex> get_capital_raise!(456)
      ** (Ecto.NoResultsError)

  """
  def get_capital_raise!(id), do: Repo.get!(CapitalRaise, id)

  def get_capital_raise(id), do: Repo.get(CapitalRaise, id)

  def get_capital_raise_by(attrs), do: Repo.get_by(CapitalRaise, attrs)

  @doc """
  Creates a capital_raise.

  ## Examples

      iex> create_capital_raise(%{field: value})
      {:ok, %CapitalRaise{}}

      iex> create_capital_raise(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_capital_raise(attrs \\ %{}) do
    %CapitalRaise{}
    |> CapitalRaise.changeset(attrs)
    |> Repo.insert()
  end

  def capital_raises_query(args) do
    Enum.reduce(args, CapitalRaise, fn
      {:orders, orders}, query ->
        query |> capital_raises_order_with(orders)

      {:filters, filters}, query ->
        query |> capital_raises_filter_with(filters)

      _, query ->
        query
    end)
  end

  defp capital_raises_order_with(orders, query) do
    Enum.reduce(orders, query, fn
      %{key: "bidding_close", value: "true"}, query ->
        from(q in query, order_by: [desc: :bidding_close])

      %{key: "bids_due", value: "true"}, query ->
        from(q in query, order_by: [desc: :bids_due])

      %{key: "bidding_open", value: "true"}, query ->
        from(q in query, order_by: [desc: :bidding_open])

      %{key: "inserted_at", value: "true"}, query ->
        from(q in query, order_by: [desc: :inserted_at])

      %{key: "last_updated", value: "true"}, query ->
        from(q in query, order_by: [desc: :updated_at])
    end)
  end

  defp capital_raises_filter_with(filters, query) do
    Enum.reduce(filters, query, fn
      %{key: "search", value: value}, query ->
        from(q in query, where: ilike(q.key, ^value) or ilike(q.name, ^value))
    end)
  end

  @doc """
  Updates a capital_raise.

  ## Examples

      iex> update_capital_raise(capital_raise, %{field: new_value})
      {:ok, %CapitalRaise{}}

      iex> update_capital_raise(capital_raise, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_capital_raise(%CapitalRaise{} = capital_raise, attrs) do
    capital_raise
    |> CapitalRaise.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a CapitalRaise.

  ## Examples

      iex> delete_capital_raise(capital_raise)
      {:ok, %CapitalRaise{}}

      iex> delete_capital_raise(capital_raise)
      {:error, %Ecto.Changeset{}}

  """
  def delete_capital_raise(%CapitalRaise{} = capital_raise) do
    Repo.delete(capital_raise)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking capital_raise changes.

  ## Examples

      iex> change_capital_raise(capital_raise)
      %Ecto.Changeset{source: %CapitalRaise{}}

  """
  def change_capital_raise(%CapitalRaise{} = capital_raise) do
    CapitalRaise.changeset(capital_raise, %{})
  end
end
