export function DeleteAccountContent() {
  return (
    <>
      <h1>Request account and data deletion</h1>
      <div className="meta">
        <div>
          <strong>App:</strong> BizTown Rent Manager
        </div>
        <div>
          <strong>Provider:</strong> Townsoft Vina Co.
        </div>
      </div>
      <h2>Option 1 — Delete inside the app (fastest)</h2>
      <p>You can do this yourself, with no approval queue:</p>
      <ol className="steps">
        <li>
          Open <strong>BizTown Rent Manager</strong> and sign in.
        </li>
        <li>
          Go to the <strong>Profile</strong> tab (person icon, bottom right).
        </li>
        <li>
          Scroll to the bottom and tap <strong>Delete account</strong>.
        </li>
        <li>
          Enter your <strong>password</strong> to confirm.
        </li>
        <li>
          Tap <strong>Delete my account</strong>, then confirm once more in the dialog.
        </li>
      </ol>
      <p>Your account and data are deleted immediately.</p>
      <h2>Option 2 — Request by email</h2>
      <p>If you can no longer open the app (lost device, forgotten password, app uninstalled):</p>
      <ul>
        <li>
          Email{" "}
          <a href="mailto:dreamnguyen@townsoftvina.com?subject=Account%20deletion%20request">
            dreamnguyen@townsoftvina.com
          </a>
        </li>
        <li>
          Subject: <strong>Account deletion request</strong>
        </li>
        <li>
          Include the <strong>phone number of the account</strong> to be deleted.
        </li>
      </ul>
      <p>
        We acknowledge within <strong>72 hours</strong> and complete the request within{" "}
        <strong>30 days</strong>. To protect you, we verify your identity first — usually by sending
        a code to the account&apos;s own phone number.
      </p>
      <h2>What gets deleted</h2>
      <p>
        When the account is deleted, the following is <strong>permanently erased</strong>:
      </p>
      <ul>
        <li>Account profile: full name, phone number, email, national ID number, photo.</li>
        <li>
          All <strong>properties</strong> where you are the sole owner, including photos.
        </li>
        <li>
          <strong>Rooms</strong> in those properties, including photos.
        </li>
        <li>
          <strong>Tenant</strong> records: name, phone number, date of birth, email, national ID
          number and <strong>identity document photos</strong>.
        </li>
        <li>
          <strong>Contracts</strong> and all their term versions.
        </li>
        <li>
          Recorded <strong>electricity and water meter readings</strong>.
        </li>
        <li>
          <strong>Invoices</strong> created, sent or collected.
        </li>
        <li>Payout bank account details.</li>
        <li>Push notification device tokens and in-app notifications.</li>
        <li>The sign-in account itself — that phone number can no longer sign in.</li>
      </ul>
      <h2>What is NOT deleted</h2>
      <ul>
        <li>
          <strong>Properties where you are only a Manager</strong> (not the owner) stay intact. Only
          your access is removed. That data belongs to the landlord and we may not delete it on
          their behalf.
        </li>
        <li>
          <strong>Properties with several owners</strong>: if another owner remains, the property
          and its data are kept for them; only your access is removed.
        </li>
      </ul>
      <h2>Data kept for a limited period</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Retention</th>
              <th>Reason</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>System backups</td>
              <td>
                up to <strong>90 days</strong>
              </td>
              <td>Disaster recovery; old backups expire and are deleted</td>
            </tr>
            <tr>
              <td>Technical logs (access times, error codes)</td>
              <td>
                up to <strong>12 months</strong>
              </td>
              <td>Security and abnormal-access detection</td>
            </tr>
            <tr>
              <td>Records we must keep by law</td>
              <td>statutory period</td>
              <td>Tax and accounting obligations</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        After these periods the data is deleted automatically. During this time it is not used for
        any other purpose.
      </p>
      <div className="callout">
        <p>
          <strong>Account deletion cannot be undone.</strong> Deleted data cannot be recovered, even
          if you register again with the same phone number.
        </p>
      </div>
      <div className="note">
        <p>
          If you are a <strong>tenant</strong>: you have no account in this app. Your information is
          entered and controlled by <strong>your landlord</strong> — please contact them directly to
          correct or delete it. You may also write to us and we will forward your request to the
          relevant landlord.
        </p>
      </div>
      <h2>Contact</h2>
      <p>
        Townsoft Vina Co. —{" "}
        <a href="mailto:dreamnguyen@townsoftvina.com">dreamnguyen@townsoftvina.com</a>
        <br /> See also our <a href="/en/privacy">Privacy Policy</a>.
      </p>
    </>
  );
}
