defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view
  alias FreshHiringWeb.Router.Helpers, as: Routes

  def sign_in_url(page, token) do
    Routes.session_path(FreshHiringWeb.Endpoint, page, token: token)
  end
end
