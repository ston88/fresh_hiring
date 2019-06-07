defmodule FreshHiringWeb.Router do
  use FreshHiringWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_cookies
    plug :fetch_session
    plug :fetch_flash
    plug :put_secure_browser_headers
    plug(FreshHiringWeb.Authentication)
  end

  scope "/api/auth", FreshHiringWeb do
    pipe_through(:api)

    post "/login", SessionController, :login
    get "/verify", SessionController, :verify
    post "/logout", SessionController, :logout

    get("/confirm", SessionController, :confirm)
  end

  scope "/api/sent_emails" do
    pipe_through(:api)

    forward "/api/sent_emails", Bamboo.SentEmailViewerPlug
  end

  scope "/api" do
    pipe_through(:api)

    forward("/graphql", Absinthe.Plug, schema: FreshHiringWeb.Schema)
  end

  scope "/", FreshHiringWeb do
    pipe_through :browser

    get "/*path", PageController, :index
  end
end
