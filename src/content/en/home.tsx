export function HomeContent() {
  return (
    <>
      <h1>BizTown Rent Manager</h1>
      <p className="lead">Manage rental properties and monthly rent invoices from your phone.</p>
      <p>
        The app is for <strong>landlords and the managers they authorise</strong>. Record utility
        meter readings and the app works out rent, electricity, water and the other fees exactly as
        the contract sets them, then sends the invoice to the tenant with a bank transfer QR code.
      </p>
      <p>
        <strong>Tenants do not need to install anything</strong> — they receive invoices by SMS,
        email or Zalo.
      </p>
      <h2>Information pages</h2>
      <ul>
        <li>
          <a href="/en/support">Support and contact</a>
        </li>
        <li>
          <a href="/en/privacy">Privacy policy</a>
        </li>
        <li>
          <a href="/en/delete-account">Request account and data deletion</a>
        </li>
      </ul>
      <h2>Contact</h2>
      <p>
        Townsoft Vina Co. —{" "}
        <a href="mailto:dreamnguyen@townsoftvina.com">dreamnguyen@townsoftvina.com</a>
      </p>
    </>
  );
}
