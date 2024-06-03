import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { FAQS, RP_INFO } from '@/lib/data';

const Page = () => {
  return (
    <>
      <div className="container pt-20 px-3 sm:px-[2rem]">
        <h2 className="text-4xl font-bold">Help</h2>
      </div>

      <section className="container py-20 px-3 sm:px-[2rem]">
        <h2 className="text-2xl font-bold">Faq</h2>
        <p className="mb-4 text-gray-400">
          Some of the most commonly asked questions that we get.
        </p>

        <Accordion type="single" collapsible>
          {FAQS.map((faq, idx) => {
            return (
              <AccordionItem key={idx} value={String(idx)}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      <section className="container px-3 sm:px-[2rem]">
        <h2 className="text-2xl font-semibold">Still have questions?</h2>
        <p className="mb-4 text-white/50">
          If you still have unanswered questions shoot us an email and well get
          back to you ASAP.
        </p>
        <a className="text-yellow-300" href={`mailto:${RP_INFO.contactEmail}`}>
          {RP_INFO.contactEmail}
        </a>
      </section>
    </>
  );
};

export default Page;
