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
    <main className=" p-6  text-white">
      <h1 className="text-2xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-4 text-sm text-subText">
        {" "}
        Do you need help with something or do you have questions on some
        features?
      </p>
      <div>
        <FAQ />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold">Have any other questions?</h2>
        <p className="text-sm text-subText py-2 ">
          Don't hesitate to send us an email
        </p>
        <span className="text-sm py-2 px-2 border-2 rounded-lg">{email}</span>
        <button
          onClick={handleCopeEmail}
          className="text-sm bg-sidebarColor hover:bg-purpleshade py-2 px-2 rounded-lg ml-2 text-WHITE "
        >
          {copyEmail ? "Copied" : "Copy"}
        </button>
      </div>
    </main>
  );
}
export default Help;
