defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view
  alias FreshHiringWeb.Router.Helpers, as: Routes

  def sign_in_url(page, token) do
    Routes.session_url(FreshHiringWeb.Endpoint, page, token)
  end
end
