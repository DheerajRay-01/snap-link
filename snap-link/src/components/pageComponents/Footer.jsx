import React from 'react'

function Footer() {
  return (
    <div>
        <footer className="footer footer-horizontal footer-center bg-neutral text-primary-content p-10">
  <aside>
  <p className="font-bold">
    SnapLink
    <br />
    Shorten. Share. Simplify.
  </p>
  <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
</aside>

</footer>
    </div>
  )
}

export default Footer