defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view
  alias FreshHiringWeb.Router.Helpers, as: Routes

  def sign_in_url(Endpoint, page, token) do
    Routes.session_url(Endpoint, page, token)
  end
end
