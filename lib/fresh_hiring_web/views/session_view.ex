defmodule FreshHiringWeb.SessionView do
  use FreshHiringWeb, :view

  def render("login.json", %{success: success, session_token: session_token}) do
    %{
      success: success,
      session_token: session_token
    }
  end

  def render("error.json", %{error: error}) do
    %{
      error: error
    }
  end
end
