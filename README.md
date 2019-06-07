# FreshHiring

## Getting Started

First, Fork this Repo.

Second, setup Phoenix, https://hexdocs.pm/phoenix/installation.html#content

To start your phoenix application.

  * Install dependencies with `mix deps.get`
  * Create and migrate your database with `mix ecto.setup`
  * Install Node.js dependencies with `cd assets && npm install`
  * Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Welcome / Login emails can be access at the following address http://localhost:4000/api/sent_emails

# File Structure

React App code can be located in the assets folder, the package.json file can be found at root.

The Phoenix app can be found in Lib

## Tasks

Fresh Equities lets investors discover and participate in capital raises.  We work by showing users a marketplace of deals and letting them bid into the book for capital raises.

### Implement Bidding for Capital Raises

The requirements for bidding are as follows;

* Bidding is a two step process.  First a user indicates their interest, then they confirm their bid, locking in their purchase. (Think of it as adding to cart and completing checkout)
* Users must be logged in to bid
* Visitors must see a prompt to sign up to bid
* A bid needs to specify the amount of money the User wants to spend
* A bid needs to round to a whole number of shares
* The users bid summary should include how much they're spending, how many shares they will get and how many options they will get.
* You will need to implement the end-to-end process
* Bidding should be handled using graphql for query and mutations.
* Bids should be part of the Organisations Context

### Bonus Round

Surprise me, implement a feature you think would be relevant to support a user bidding.

## Questions?

Ask me anything at rhys@freshequities.com