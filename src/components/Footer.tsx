import BuyMeACoffeeButton from './BuyMeACoffee';

const Footer = () => {
  return (
    <footer className="w-full px-4 mx-auto mt-20 border-t max-w-container sm:px-6 lg:px-8">
      <div className="py-10 text-center border-t border-slate-900/5">
        RepoPurge
        <p className="mt-5 text-sm leading-6 text-center text-slate-500">
          &copy; {new Date().getFullYear()} RepoPurge. All rights reserved.
        </p>
        <div className="flex items-center justify-center mt-8 space-x-4 text-sm font-semibold leading-6 text-slate-700">
          <a href="/privacy-policy">Privacy policy</a>
          <div className="w-px h-4 bg-slate-500/20"></div>
          <a href="/changelog">Changelog</a>
          <div className="w-px h-4 bg-slate-500/20"></div>
          <BuyMeACoffeeButton />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
