import BuyMeACoffeeButton from './BuyMeACoffee';

const Footer = () => {
  return (
    <footer className="w-full mx-auto mt-20 border-t max-w-container lg:px-8 px-3 sm:px-[2rem]">
      <div className="py-10 text-center border-t border-slate-900/5">
        RepoPurge
        <p className="mt-5 text-sm leading-6 text-center text-slate-500">
          &copy; {new Date().getFullYear()} RepoPurge. All rights reserved.
        </p>
        <div className="flex items-center flex-col md:flex-row justify-center mt-8 space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy" className="my-1 md:my-0">
            Privacy policy
          </a>
          <div className="w-px h-4 bg-slate-500/20 hidden md:block"></div>
          <a href="/changelog" className="my-1 md:my-0">
            Changelog
          </a>
          <div className="w-px h-4 bg-slate-500/20 hidden md:block"></div>
          <a
            href="https://github.com/aaron-soto/repo-purge"
            className="my-1 md:my-0"
            target="_blank"
          >
            Open Source
          </a>
          <div className="w-px h-4 bg-slate-500/20 hidden md:block"></div>
          <BuyMeACoffeeButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
