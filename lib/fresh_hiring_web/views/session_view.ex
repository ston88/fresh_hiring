defmodule FreshHiringWeb.SessionView do
  use FreshHiringWeb, :view

  def render("login.json", %{success: success, session_token: session_token}) do
    %{
      success: success,
      session_token: session_token
    }
  end

  def render("logout.json", %{ success: success}) do
    %{
      success: success
    }
  end

  def render("error.json", %{error: error}) do
    %{
      error: error
    }
  end
end
