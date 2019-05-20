// assets/js/components/Header.tsx

import * as React from 'react'

const Header: React.FC = () => (
  <header>
    <section className="container">
      <nav role="navigation">
        <ul>
          <li>
            <a href="#">Get started</a>
          </li>
        </ul>
      </nav>
      <a href="#" className="phx-logo">
        <img src="images/phoenix.png" alt="Fresh Equities" />
      </a>
    </section>
  </header>
)

export default Header