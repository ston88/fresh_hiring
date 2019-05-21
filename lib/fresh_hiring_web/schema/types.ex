defmodule FreshHiringWeb.Schema.Types do
  use FreshHiringWeb, :type

  input_object :user_input do
    field :email, :string
    field :invalidated, :boolean
    field :name, :string
  end

  object :user do
    field :email, :string
    field :invalidated, :boolean
    field :name, :string
  end
end
