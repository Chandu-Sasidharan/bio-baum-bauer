import backgroundImage from '../assets/images/leaves_background_01.webp';
import { HiHome } from 'react-icons/hi';
import PageBreadcrumb from '../components/PageBreadcrumb';
import EachPageHeader from '../components/EachPageHeader';
import { Link } from 'react-router-dom';
import BottomImg from '../assets/images/news_images/leaves_background.png';
import { RiArrowGoBackLine } from 'react-icons/ri';

const Privacy = () => {
  document.title = 'Privacy Policy for Solawi Zabergäu';
  const titles = ['Privacy Policy for Solawi Zabergäu'];
  const aLinkValues = [{ linkTo: '/', linkIcon: HiHome, linkText: 'Home' }];
  const daLinkValues = { linkText: 'Privacy Policy' };

  return (
    <div className='text-stone relative'>
      <PageBreadcrumb activeLinks={aLinkValues} deActiveLink={daLinkValues} />
      {/* Privacy title, positioned absolutely */}
      <h2 className='absolute left-1/2 top-0 -translate-x-1/2 transform py-10 text-center'>
        <EachPageHeader title={titles[0]} subtitle={titles[1]} />
      </h2>
      <section className='relative flex flex-col items-center justify-center pt-[100px] md:pt-[160px] lg:pt-[180px] xl:pt-[220px]'>
        {/* Overlay with background image and opacity */}
        <div
          className='absolute left-0 top-0 z-[-1] h-[25%] w-full bg-cover bg-center bg-no-repeat'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            opacity: 0.2,
          }}
        ></div>

        {/* Privacy Policy Content */}
        <div className='mx-auto my-10 max-w-6xl rounded-xl bg-white px-4 py-8 shadow-lg md:p-8'>
          <p>
            At <b>Bio Baum Bauer</b>, accessible from{' '}
            <b>www.biobaumbauer.com</b>, one of our main priorities is the
            privacy of our visitors. This Privacy Policy document contains types
            of information that is collected and recorded by Bio Baum Bauer and
            how we use it.
          </p>

          <p>
            If you have additional questions or require more information about
            our Privacy Policy, do not hesitate to contact us.
          </p>

          <p>
            This Privacy Policy applies only to our online activities and is
            valid for visitors to our website with regards to the information
            that they shared and/or collect in Bio Baum Bauer. This policy is
            not applicable to any information collected offline or via channels
            other than this website.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>Consent</h2>

          <p>
            By using our website, you hereby consent to our Privacy Policy and
            agree to its terms.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Information we collect
          </h2>

          <p>
            The personal information that you are asked to provide, and the
            reasons why you are asked to provide it, will be made clear to you
            at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information
            about you such as your name, email address, phone number, the
            contents of the message and/or attachments you may send us, and any
            other information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact
            information, including items such as name, company name, address,
            email address, and telephone number.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            How we use your information
          </h2>

          <p>
            We use the information we collect in various ways, including to:
          </p>

          <ul className='list-disc space-y-2 pl-5'>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>
              Communicate with you, either directly or through one of our
              partners, including for customer service, to provide you with
              updates and other information relating to the website, and for
              marketing and promotional purposes
            </li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className='mt-6 text-3xl font-semibold'>Log Files</h2>

          <p>
            Bio Baum Bauer follows a standard procedure of using log files.
            These files log visitors when they visit websites. All hosting
            companies do this and a part of hosting services' analytics. The
            information collected by log files include internet protocol (IP)
            addresses, browser type, Internet Service Provider (ISP), date and
            time stamp, referring/exit pages, and possibly the number of clicks.
            These are not linked to any information that is personally
            identifiable. The purpose of the information is for analyzing
            trends, administering the site, tracking users' movement on the
            website, and gathering demographic information.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Cookies and Web Beacons
          </h2>

          <p>
            Like any other website, Bio Baum Bauer uses "cookies". These cookies
            are used to store information including visitors' preferences, and
            the pages on the website that the visitor accessed or visited. The
            information is used to optimize the users' experience by customizing
            our web page content based on visitors' browser type and/or other
            information.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Advertising Partners Privacy Policies
          </h2>

          <p>
            You may consult this list to find the Privacy Policy for each of the
            advertising partners of Bio Baum Bauer.
          </p>

          <p>
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on Bio Baum Bauer,
            which are sent directly to users' browser. They automatically
            receive your IP address when this occurs. These technologies are
            used to measure the effectiveness of their advertising campaigns
            and/or to personalize the advertising content that you see on
            websites that you visit.
          </p>

          <p>
            Note that Bio Baum Bauer has no access to or control over these
            cookies that are used by third-party advertisers.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Third Party Privacy Policies
          </h2>

          <p>
            Bio Baum Bauer's Privacy Policy does not apply to other advertisers
            or websites. Thus, we are advising you to consult the respective
            Privacy Policies of these third-party ad servers for more detailed
            information. It may include their practices and instructions about
            how to opt-out of certain options.{' '}
          </p>

          <p>
            You can choose to disable cookies through your individual browser
            options. To know more detailed information about cookie management
            with specific web browsers, it can be found at the browsers'
            respective websites.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            CCPA Privacy Rights (Do Not Sell My Personal Information)
          </h2>

          <p>
            Under the CCPA, among other rights, California consumers have the
            right to:
          </p>
          <p>
            Request that a business that collects a consumer's personal data
            disclose the categories and specific pieces of personal data that a
            business has collected about consumers.
          </p>
          <p>
            Request that a business delete any personal data about the consumer
            that a business has collected.
          </p>
          <p>
            Request that a business that sells a consumer's personal data, not
            sell the consumer's personal data.
          </p>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            GDPR Data Protection Rights
          </h2>

          <p>
            We would like to make sure you are fully aware of all of your data
            protection rights. Every user is entitled to the following:
          </p>
          <p>
            The right to access – You have the right to request copies of your
            personal data. We may charge you a small fee for this service.
          </p>
          <p>
            The right to rectification – You have the right to request that we
            correct any information you believe is inaccurate. You also have the
            right to request that we complete the information you believe is
            incomplete.
          </p>
          <p>
            The right to erasure – You have the right to request that we erase
            your personal data, under certain conditions.
          </p>
          <p>
            The right to restrict processing – You have the right to request
            that we restrict the processing of your personal data, under certain
            conditions.
          </p>
          <p>
            The right to object to processing – You have the right to object to
            our processing of your personal data, under certain conditions.
          </p>
          <p>
            The right to data portability – You have the right to request that
            we transfer the data that we have collected to another organization,
            or directly to you, under certain conditions.
          </p>
          <p>
            If you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Children's Information
          </h2>

          <p>
            Another part of our priority is adding protection for children while
            using the internet. We encourage parents and guardians to observe,
            participate in, and/or monitor and guide their online activity.
          </p>

          <p>
            Bio Baum Bauer does not knowingly collect any Personal Identifiable
            Information from children under the age of 13. If you think that
            your child provided this kind of information on our website, we
            strongly encourage you to contact us immediately and we will do our
            best efforts to promptly remove such information from our records.
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>
            Changes to This Privacy Policy
          </h2>

          <p>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
          </p>

          <p>
            Our Privacy Policy was created with the help of the{' '}
            <a href='https://www.privacypolicygenerator.info'>
              Privacy Policy Generator
            </a>
            .
          </p>

          <h2 className='mt-6 text-3xl font-semibold'>Contact Us</h2>

          <p>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </p>
          <br />
          {/* Link going back to Home page */}
          <div className='mt-10 flex justify-center'>
            <Link
              to='/'
              className='text-md bg-primary text-accent hover:bg-primary-light duration-4000 flex w-max items-center justify-center gap-2 rounded-md border-2 px-4 py-2 font-bold transition ease-linear md:text-lg'
            >
              <RiArrowGoBackLine />
              <span>Back to Home Page</span>
            </Link>
          </div>
        </div>
      </section>
      {/* Footer Image */}
      <img
        className='w-full'
        src={BottomImg}
        alt='Privacy Policy Footer Image'
      />
    </div>
  );
};

export default Privacy;
