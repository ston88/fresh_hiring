defmodule FreshHiring.Repo.Migrations.AddSearchToOrganisations do
  use Ecto.Migration

  def change do
    execute("CREATE extension if not exists pg_trgm with schema pg_catalog;")
    execute("CREATE INDEX index_accounts_user_on_name ON accounts_users USING gin(name gin_trgm_ops)")
    execute("CREATE INDEX index_accounts_user_on_email ON accounts_users USING gin(email gin_trgm_ops)")

    execute("CREATE INDEX index_organisations_capital_raise_on_name ON organisations_capital_raises USING gin(name gin_trgm_ops)")
    execute("CREATE INDEX index_organisations_capital_raises_on_key ON organisations_capital_raises USING gin(key gin_trgm_ops)")
  end
end
