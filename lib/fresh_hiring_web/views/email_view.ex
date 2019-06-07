defmodule FreshHiringWeb.EmailView do
  use FreshHiringWeb, :view

  def sign_in_url(page, token) do
    FreshHiringWeb.Router.Helpers.session_url(page, token)
  end
end
