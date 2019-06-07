# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     FreshHiring.Repo.insert!(%FreshHiring.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

capital_raises =[%{
  allocation_available: true,
  banner: "/images/dealpad-banner.jpg",
  bids_due: ~N[2019-12-12 17:00:00],
  bidding_open: ~N[2019-06-07 00:00:00],
  bidding_close: ~N[2019-12-31 17:00:00],
  gics: "Internet Services & Infrastructure",
  halt_price: 1.50,
  key: "ASX:DLP",
  logo: "/images/dealpad-logo.png",
  market_cap: 5_000_000,
  max_amount: 1_500_000,
  min_amount: 1_000_000,
  name: "dealPad Pty Ltd",
  options_available: true,
  options_expiration: 36,
  options_ratio_numerator: 1,
  options_ratio_denominator: 1,
  options_strike_price: 5.00,
  price: 1.00,
  summary: "Find smart money, quickly, through specialist advisors. We help you locate the right investors for you company.",
  website: "https://www.dealpad.com.au"
}, %{
  banner: "/images/frankiefinancial-banner.png",
  bids_due: ~N[2019-12-12 17:00:00],
  bidding_open: ~N[2019-06-07 00:00:00],
  bidding_close: ~N[2019-12-31 17:00:00],
  gics: "Financial Exchanges & Data",
  halt_price: 5.20,
  key: "ASX:FFI",
  logo: "/images/frankiefinancial-logo.jpeg",
  market_cap: 100_000_000,
  max_amount: 20_000_000,
  min_amount: 15_000_000,
  name: "Frankie Financial",
  options_available: true,
  options_expiration: 36,
  options_ratio_numerator: 1,
  options_ratio_denominator: 1,
  options_strike_price: 15.00,
  price: 5.00,
  summary: "Frankie connects financial service providers to 100+ different vendors and data sources from ID verification, eKYC, AML, fraud monitoring and credit tools, to enable d ata lead decisions and provide a unified single point of truth.",
  website: "https://frankiefinancial.com/"
}, %{
  banner: "/images/hypetap-banner.webp",
  bids_due: ~N[2019-12-12 17:00:00],
  bidding_open: ~N[2019-06-07 00:00:00],
  bidding_close: ~N[2019-12-31 17:00:00],
  gics: "Advertising",
  halt_price: 3.00,
  key: "ASX:HYP",
  logo: "/images/hypetap-logo.png",
  market_cap: 10_000_000,
  max_amount: 2_000_000,
  min_amount: 2_000_000,
  name: "Hype Tap",
  options_available: true,
  options_expiration: 36,
  options_ratio_numerator: 1,
  options_ratio_denominator: 2,
  options_strike_price: 5.00,
  price: 2.00,
  summary: "Hypetap is an influencer marketing service provider, focused on creative campaigns, real influence and data driven insights.",
  website: "https://www.hypetap.com/"
}]

Enum.each(capital_raises, fn cr ->
  case FreshHiring.Repo.get_by(FreshHiring.Organisations.CapitalRaise, %{key: cr.key}) do
    nil ->
      %FreshHiring.Organisations.CapitalRaise{}
      |> FreshHiring.Organisations.CapitalRaise.changeset(cr)
      |> FreshHiring.Repo.insert()

    existing_raise ->
      existing_raise
      |> FreshHiring.Organisations.CapitalRaise.changeset(cr)
      |> FreshHiring.Repo.update()
  end
end)
