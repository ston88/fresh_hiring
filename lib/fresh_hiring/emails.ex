defmodule FreshHiring.Emails do
  use Bamboo.Phoenix, view: FreshHiringWeb.EmailView

  def base_email do
    new_email()
    |> from("Team @ Fresh <no-reply@freshequities.com>")
    |> put_html_layout({FreshHiringWeb.LayoutView, "email.html"})
  end

  def welcome_email(email, name, token) do
    base_email()
    |> to(email)
    |> subject("Welcome to Fresh Hiring")
    |> assign(:name, name)
    |> assign(:token, token)
    |> render(:welcome)
  end

  def sign_in_email(email, token) do
    base_email()
    |> to(email)
    |> subject("Sign in to Fresh Hiring")
    |> assign(:token, token)
    |> render(:sign_in)
  end
end
