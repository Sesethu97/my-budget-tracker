import { useState } from "react";
import FAQ from "../../components/faq/FAQ";
function Help() {
  const [copyEmail, setCopyEmail] = useState(false);
  const email = "example@gmail.com";

  const handleCopeEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopyEmail(true);
      setTimeout(() => setCopyEmail(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <main className="ml-48 p-6 text-center">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-4">
        {" "}
        Do you need help with something or do you have questions on some
        features?
      </p>
      <div>
        <FAQ />
      </div>

      <h2 className="text-lg font-bold">Have any other questions?</h2>
      <p className="text-base py-2 ">Don't hesitate to send us an email</p>
      <span className="text-sm py-6">{email}</span>
      <button
        onClick={handleCopeEmail}
        className="text-sm bg-secondary hover:bg-gray-800 py-2 px-2 rounded ml-2 text-tertiary "
      >
        {copyEmail ? "Copied" : "Copy"}
      </button>
    </main>
  );
}
export default Help;
