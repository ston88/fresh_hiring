defmodule FreshHiring.AccountsTest do
  use FreshHiring.DataCase

  alias FreshHiring.Accounts

  describe "accounts_users" do
    alias FreshHiring.Accounts.User

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_accounts_users/0 returns all accounts_users" do
      user = user_fixture()
      assert Accounts.list_accounts_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Accounts.update_user(user, @update_attrs)
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "accounts_auth_tokens" do
    alias FreshHiring.Accounts.AuthToken

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def auth_token_fixture(attrs \\ %{}) do
      {:ok, auth_token} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_auth_token()

      auth_token
    end

    test "list_accounts_auth_tokens/0 returns all accounts_auth_tokens" do
      auth_token = auth_token_fixture()
      assert Accounts.list_accounts_auth_tokens() == [auth_token]
    end

    test "get_auth_token!/1 returns the auth_token with given id" do
      auth_token = auth_token_fixture()
      assert Accounts.get_auth_token!(auth_token.id) == auth_token
    end

    test "create_auth_token/1 with valid data creates a auth_token" do
      assert {:ok, %AuthToken{} = auth_token} = Accounts.create_auth_token(@valid_attrs)
    end

    test "create_auth_token/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_auth_token(@invalid_attrs)
    end

    test "update_auth_token/2 with valid data updates the auth_token" do
      auth_token = auth_token_fixture()
      assert {:ok, %AuthToken{} = auth_token} = Accounts.update_auth_token(auth_token, @update_attrs)
    end

    test "update_auth_token/2 with invalid data returns error changeset" do
      auth_token = auth_token_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_auth_token(auth_token, @invalid_attrs)
      assert auth_token == Accounts.get_auth_token!(auth_token.id)
    end

    test "delete_auth_token/1 deletes the auth_token" do
      auth_token = auth_token_fixture()
      assert {:ok, %AuthToken{}} = Accounts.delete_auth_token(auth_token)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_auth_token!(auth_token.id) end
    end

    test "change_auth_token/1 returns a auth_token changeset" do
      auth_token = auth_token_fixture()
      assert %Ecto.Changeset{} = Accounts.change_auth_token(auth_token)
    end
  end
end
