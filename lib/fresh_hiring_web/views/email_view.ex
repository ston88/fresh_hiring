defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view

  def sign_in_url(endpoint, page, token) do
    FreshHiringWeb.Router.Helpers.session_url(endpoint, page, token)
  end
end
