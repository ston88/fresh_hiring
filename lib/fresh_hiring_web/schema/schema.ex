defmodule FreshHiringWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :classic

  alias FreshHiringWeb.Resolvers

  import_types __MODULE__.Types
  import_types Absinthe.Plug.Types

  query do
    field :me, :user do
      resolve &Resolvers.Accounts.find_user/3
    end
  end

  mutation do
    field :create_auth_token, :string do
      arg :email, non_null(:string)
      arg :redirect_to, :string
      resolve &Resolvers.Accounts.create_auth_token/3
    end

    field :create_user, :user do
      arg :user, non_null(:user_input)
      arg :redirect_to, :string
      resolve &Resolvers.Accounts.create_user/3
    end
  end
end
