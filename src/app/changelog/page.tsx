import { CHANGELOG } from '@/lib/data';

const Page = () => {
  return (
    <div className="container pt-20 px-3 sm:px-[2rem]">
      <h2 className="text-4xl font-bold">Changelog</h2>

      {CHANGELOG.map((change, idx) => {
        return (
          <div key={idx} className="py-8">
            <div className="inline-block px-2 py-[2px] mb-4 text-2xl font-bold text-black bg-white rounded-md">
              {change.version}
            </div>
            <div className="pl-4">
              <a
                href={change.githubLink}
                target="_blank"
                className="underline text-yellow-400/90"
              >
                {change.date}
              </a>

              <ul className="pl-8 mt-4 list-disc">
                {change.changes.map((item, idx) => {
                  return <li key={idx}>{item}</li>;
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
