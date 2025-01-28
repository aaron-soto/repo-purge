import { CONTACT_INFO } from "@/lib/data";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const Page = () => {
  return (
    <div className="container pt-8 px-3 sm:px-[2rem]">
      <PageHeader>Privacy Policy</PageHeader>

      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">
          Owner and Data Collector
        </h2>
        <b>Aaron Soto</b>
        <p>Casa Grande, Arizona</p>
        <p>
          <b>Owner Contact Email: </b>
          <Link href={"mailto:" + CONTACT_INFO.email}>
            aaron.m.soto1@gmail.com
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">1. Introduction</h2>
        <p className="text-[#8a8a8a]">
          Welcome to Repo Purge! I am committed to protecting your personal
          information and your right to privacy. If you have any questions or
          concerns about this privacy policy or our practices with regard to
          your personal information, please contact me at{" "}
          <Link href={"mailto:" + CONTACT_INFO.email}>
            {CONTACT_INFO.email}
          </Link>
          .
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">
          2. Information We Collect
        </h2>
        <p className="text-[#8a8a8a]">
          When you visit our app, we might collect certain information related
          to your device, such as your IP address, what pages you visit on our
          app, whether you were referred to by another website, and at what time
          you accessed our app.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">
          3. How We Use Your Information
        </h2>
        <p className="text-[#8a8a8a]">
          We use the information we collect from you to manage your account,
          provide our services, and improve our app. For example, we use{" "}
          <a
            href="https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28"
            target="_blank"
          >
            your GitHub authentication
          </a>{" "}
          to access and manage your repositories as per your instructions.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">
          4. Sharing Your Information
        </h2>
        <p className="text-[#8a8a8a]">
          We do not share or sell your personal information to third parties for
          marketing purposes. We only share your information with our trusted
          service providers who assist us with the operation of our app, under
          strict confidentiality agreements.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">5. Security</h2>
        <p className="text-[#8a8a8a]">
          We strive to maintain reasonable administrative, technical, and
          physical safeguards designed to protect the personal information you
          provide against accidental, unlawful, or unauthorized destruction,
          loss, alteration, access, disclosure, or use.
        </p>
      </section>
      <section>
        <h2 className="text-2xl font-light mt-8 mb-1">
          6. Changes to This Privacy Policy
        </h2>
        <p className="text-[#8a8a8a]">
          We may update this privacy policy from time to time in order to
          reflect changes to our practices or for other operational, legal, or
          regulatory reasons.
        </p>
      </section>
    </div>
  );
};

export default Page;
