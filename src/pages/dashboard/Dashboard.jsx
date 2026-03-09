function Dashboard() {
  return (
    <main className="ml-48 p-6 text-center text-white">
      <h1 className="text-2xl font-bold">Home</h1>

      <div className=" flex flex-row">
        <div className="flex flex-row gap-3 pt-4">
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Total Balance
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R 12</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Monthly Income
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R 12</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Monthly Expenses
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R 12</p>
              </div>
            </a>
          </div>
          <div className="flex flex-row">
            <a
              href="#"
              className="bg-neutral-primary-soft flex items-center justify-between max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
            >
              <h5 className="text-2xl font-semibold tracking-tight text-heading leading-8">
                Saving Rate{" "}
              </h5>

              <div className="w-24 h-24 border border-amber-200 rounded-full flex items-center justify-center">
                <p className="text-body">R 12</p>
              </div>
            </a>
          </div>
        </div>
        <a
          href="#"
          className="bg-neutral-primary-soft block max-w-sm p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium"
        >
          <h5 className="mb-3 text-2xl font-semibold tracking-tight text-heading leading-8">
            Recent Expenses
          </h5>
          <p className="text-body">
            Here are the biggest technology acquisitions of 2025 so far, in
            reverse chronological order.
          </p>
        </a>
      </div>
      <div className="bg-neutral-primary-soft w-full mt-2 p-6 border border-default rounded-md shadow-xs">
        <div className="flex gap-4">
          <div className="flex-1 bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium">
            <h3>Monthly Expenses Trend</h3>
          </div>

          <div className="flex-1 bg-neutral-primary-soft p-6 border border-default rounded-md shadow-xs hover:bg-neutral-secondary-medium">
            <h3>Daily Expenses Trend</h3>
          </div>
        </div>
      </div>
    </main>
  );
}
export default Dashboard;
