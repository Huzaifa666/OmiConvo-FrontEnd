import { AUTH_ROUTE_TYPES } from '@/constants/routePath';
import { Disclosure } from '@headlessui/react';
import { IconPlus, IconMinus } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What Information We Collect',
    answer:
      "When you use our service, we take your privacy seriously. That's why we want to be transparent and make it easy to read about how we process data when you use OmiConvo. We collect and store the messages you receive, which includes the contents of those messages, such as comments, images or attachments. We also collect metadata such as the sender, the receiver, the date and time of these messages, and any associated subject lines or message IDs to display information correctly in the UI. We understand that your account and organization are personal and private, and we take every measure to protect your information. We use industry-standard security measures to safeguard your data, and we never share your information with third parties without your consent.",
  },
  {
    question: 'How We Use Your Information',
    answer:
      'We only use your account information after you consent to the service you have in OmiConvo. This includes sending, receiving, and storing messages, providing analytics, and allowing you to access services through our platform. We do not use your information for any other purpose.',
  },
  {
    question: 'How We Protect Your Information',
    answer:
      'We take the security of your personal information seriously. We use industry-leading security measures to protect your information from unauthorized access, use, or disclosure. We also regularly monitor our systems for potential vulnerabilities and take appropriate action to address them. Any significant data leak discovered will be publicly disclosed, and any affected users will be notified.',
  },
  {
    question: 'Sharing Your Information',
    answer:
      'We do not share your personal information with any third parties except as required by law. We may disclose your information if we believe in good faith that such disclosure is necessary to comply with government legal obligations, protect our rights or property, or prevent fraud or other illegal activity. All data is stored in GCP Singapore-based data centers according to compliance standards such as the Personal Data Protection Act 2012, SOC 2, and Cloud Security Alliance.',
  },
  {
    question: 'Your Rights',
    answer:
      'You have the right to access, correct, or delete your account anytime. You can do this by contacting us through our platform or via email. OmiConvo does not knowingly collect information from children under the age of 13. If you have reason to believe that a child under the age of 13 has provided Personal Data to OmiConvo through the service, please contact us at privacy@omiconvo.com, and we will endeavor to delete that information from our databases. We may need the requestor to provide additional information to confirm the request.',
  },
  {
    question: 'Changes to this Privacy Policy',
    answer:
      'We reserve the right to change this Privacy Policy at any time. We will notify you of any changes by posting the updated policy on our website and through the platform through the support channel in your account. If you have any questions or concerns about our Privacy Policy, please get in touch with us through our platform or via email. At our core, we believe in providing a secure and better omni channel platform that you can trust and rely on. We appreciate you choosing OmiConvo and welcome all feedback on this policy or the platform.',
  },
];

const Privacy = () => {
  return (
    <div className="mb-20 bg-white">
      <div className="bg-white px-6 py-16 sm:py-20 md:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Privacy Policy
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-lg">
            We prioritize your security and peace of mind. We aim to ensure that
            you feel confident and safe while using OmiConvo.
          </p>
        </div>
        <div className="mt-6 flex items-center justify-center gap-x-6">
          <Link
            to={AUTH_ROUTE_TYPES.SIGNUP}
            className="rounded-md bg-blue-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-primary"
          >
            Get started
          </Link>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-6 py-2 sm:py-2 lg:px-2 lg:py-2">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {faqs.map((faq) => (
              <Disclosure as="div" key={faq.question} className="pt-6">
                {({ open }) => (
                  <>
                    <dt>
                      <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          {open ? (
                            <IconMinus className="h-6 w-6" aria-hidden="true" />
                          ) : (
                            <IconPlus className="h-6 w-6" aria-hidden="true" />
                          )}
                        </span>
                      </Disclosure.Button>
                    </dt>
                    <Disclosure.Panel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
