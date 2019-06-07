defmodule FreshHiringWeb.Schema do
  use Absinthe.Schema
  use Absinthe.Relay.Schema, :classic

  alias FreshHiringWeb.Resolvers

  import_types __MODULE__.Types
  import_types Absinthe.Plug.Types

  query do
    connection field :capital_raise_list, node_type: :capital_raise do
      arg(:options, :options_input)
      resolve(&Resolvers.Organisations.capital_raises_cursor/3)
    end

    field :capital_raise, :capital_raise do
      arg :id, non_null(:id)
      resolve &Resolvers.Organisations.find_capital_raise/3
    end

    field :me, :user do
      resolve &Resolvers.Accounts.find_user/3
    end
  end

  mutation do
    field :create_user, :user do
      arg :user, non_null(:user_input)
      arg :redirect_to, :string
      resolve &Resolvers.Accounts.create_user/3
    end

    field :update_user, :user do
      arg :user_id, non_null(:id)
      arg :user, non_null(:user_input)
      resolve &Resolvers.Accounts.update_user/3
    end
  end
end
