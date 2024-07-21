import { Link } from 'react-router-dom';

export default function IndexPage() {
  return (
    <section className="relative bg-hero-image bg-cover bg-center bg-no-repeat h-screen sm:block flex items-center">
      <div className="absolute inset-0 bg-gray-900/50"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl ltr:sm:text-left rtl:sm:text-right font-MONT">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Create Magical
            <strong className="block font-extrabold text-rose-700">
              Bedtime Stories
            </strong>
          </h1>

          <p className="mt-4 max-w-md sm:text-xl/relaxed">
            Unleash the power of AI to co-create enchanting tales with your
            kids.
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Link
              to="dashboard"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto font-MONT"
            >
              Generate Story
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
