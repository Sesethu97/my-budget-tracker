import { useState } from "react";

const faqData = [
  {
    question: "How do I add a new budget?",
    answer:
      "You can create a new budget by selecting “Add Budget,” entering a name, setting the monthly amount, and choosing a category. Your budget will then appear on your dashboard for tracking.",
  },
  {
    question: "Can I categorize my expenses?",
    answer:
      "Yes, You can assign categories like Food, Transport, Rent, or Entertainment to each expense. This helps you see where your money is going.",
  },
  {
    question: "Can I view reports or summaries?",
    answer:
      "Yes, Absolutely. The app provides weekly and monthly summaries, showing total spending per category and your remaining budget. You can also view charts for a visual overview.",
  },
  {
    question: "How do I change my account mail?",
    answer: "Go to Settings → Account → Change email.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Yes. All your data is securely stored and only accessible by you. You can also delete your account at any time, and all information will be removed permanently.",
  },
];

function FAQ() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggle = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <main className="py-10">
      <div className="max-w-200 mx-auto bg-primary rounded-lg p-6 shadow-md">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border-b border-secondary py-4 last:border-none"
          >
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggle(index)}
            >
              <h4 className="font-medium text-white">{item.question}</h4>
              <span className="text-xl font-bold">
                {openFAQ === index ? "-" : "+"}
              </span>
            </div>

            {openFAQ === index && (
              <div className="mt-3 text-stone-400">
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}

export default FAQ;
