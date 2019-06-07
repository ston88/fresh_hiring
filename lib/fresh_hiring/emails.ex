defmodule FreshHiring.Emails do
  use Bamboo.Phoenix, view: FreshHiringWeb.EmailView

  def base_email do
    new_email()
    |> from("Team @ Fresh <no-reply@freshequities.com>")
    |> put_html_layout({FreshHiringWeb.LayoutView, "email.html"})
  end

  def welcome_email(session, user) do
    base_email()
    |> to(user.email)
    |> subject("Welcome to Fresh Hiring")
    |> assign(:name, user.name)
    |> assign(:token, session.token)
    |> render(:welcome)
  end

  def session_verify(session, user) do
    base_email()
    |> to(user.email)
    |> subject("Sign in to Fresh Hiring")
    |> assign(:token, session.token)
    |> render(:sign_in)
  end
end
