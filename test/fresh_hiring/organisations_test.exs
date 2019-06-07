defmodule FreshHiring.OrganisationsTest do
  use FreshHiring.DataCase

  alias FreshHiring.Organisations

  describe "organisations_capital_raises" do
    alias FreshHiring.Organisations.CapitalRaise

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def capital_raise_fixture(attrs \\ %{}) do
      {:ok, capital_raise} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Organisations.create_capital_raise()

      capital_raise
    end

    test "list_organisations_capital_raises/0 returns all organisations_capital_raises" do
      capital_raise = capital_raise_fixture()
      assert Organisations.list_organisations_capital_raises() == [capital_raise]
    end

    test "get_capital_raise!/1 returns the capital_raise with given id" do
      capital_raise = capital_raise_fixture()
      assert Organisations.get_capital_raise!(capital_raise.id) == capital_raise
    end

    test "create_capital_raise/1 with valid data creates a capital_raise" do
      assert {:ok, %CapitalRaise{} = capital_raise} = Organisations.create_capital_raise(@valid_attrs)
    end

    test "create_capital_raise/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Organisations.create_capital_raise(@invalid_attrs)
    end

    test "update_capital_raise/2 with valid data updates the capital_raise" do
      capital_raise = capital_raise_fixture()
      assert {:ok, %CapitalRaise{} = capital_raise} = Organisations.update_capital_raise(capital_raise, @update_attrs)
    end

    test "update_capital_raise/2 with invalid data returns error changeset" do
      capital_raise = capital_raise_fixture()
      assert {:error, %Ecto.Changeset{}} = Organisations.update_capital_raise(capital_raise, @invalid_attrs)
      assert capital_raise == Organisations.get_capital_raise!(capital_raise.id)
    end

    test "delete_capital_raise/1 deletes the capital_raise" do
      capital_raise = capital_raise_fixture()
      assert {:ok, %CapitalRaise{}} = Organisations.delete_capital_raise(capital_raise)
      assert_raise Ecto.NoResultsError, fn -> Organisations.get_capital_raise!(capital_raise.id) end
    end

    test "change_capital_raise/1 returns a capital_raise changeset" do
      capital_raise = capital_raise_fixture()
      assert %Ecto.Changeset{} = Organisations.change_capital_raise(capital_raise)
    end
  end
end
