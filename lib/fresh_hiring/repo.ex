defmodule FreshHiring.Repo do
  use Ecto.Repo,
    otp_app: :fresh_hiring,
    adapter: Ecto.Adapters.Postgres
end
