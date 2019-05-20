defmodule FreshHiringWeb.PageController do
  use FreshHiringWeb, :controller

  def index(conn, _params) do
    render(conn, "index.html")
  end
end
