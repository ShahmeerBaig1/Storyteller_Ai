import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="bg-white dark:bg-[#5e1675]">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="md:flex md:items-center md:gap-12">
            <Link className="md:flex md:items-center" to="/">
              <span className="sr-only">Home</span>
              <img className="block w-8 h-8 mr-4" src="/logo.png" alt="" />
              <span className="md:block hidden">StoryTeller AI</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <button
                className="block w-full rounded bg-rose-600 px-6 py-2.5 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
                href="#"
              >
                <Link to="/dashboard">Generate Story</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
