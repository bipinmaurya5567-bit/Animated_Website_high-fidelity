export function Footer() {
  return (
    <footer className="bg-gray-900 px-6 py-16 text-gray-300">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold text-white">Nano Banana</h3>
          <p className="mt-3 text-sm text-gray-400">
            Premium cold-crafted juices built for modern wellness, flavor, and freshness.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Cream Mango</li>
            <li>Dutch Chocolate</li>
            <li>Ruby Pomegranate</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li>Shipping & Delivery</li>
            <li>Returns</li>
            <li>Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Newsletter</h4>
          <p className="mt-4 text-sm text-gray-400">Get early access to launches and seasonal drops.</p>
          <div className="mt-4 flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full rounded-lg border border-white/20 bg-white/5 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:border-orange-400 focus:outline-none"
            />
            <button className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-400">
              Join
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
