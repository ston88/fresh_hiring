defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view
  alias FreshHiringWeb.Router.Helpers, as: Routes

  require Logger
  def sign_in_url(page, token) do
    Logger.info "Verify Path: #{inspect Routes.session_path(FreshHiringWeb.Endpoint, page, token: token)}"
    Routes.session_path(FreshHiringWeb.Endpoint, page, token: token)
  end
end
