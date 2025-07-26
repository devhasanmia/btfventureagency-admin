
const Home = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* Recently Working */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Recently Working
          </h2>
          <p className="text-3xl font-bold text-brand-500">5 Projects</p>
        </div>

        {/* Total Services */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Total Services
          </h2>
          <p className="text-3xl font-bold text-brand-500">12 Services</p>
        </div>

        {/* Contacts */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">
            Contacts
          </h2>
          <p className="text-3xl font-bold text-brand-500">98 Contacts</p>
        </div>
      </div>
    </>
  );
};

export default Home;
