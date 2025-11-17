import { Helmet } from 'react-helmet-async';
import backgroundImage from '/images/background/leaves-background.webp';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'Datenschutz | Bio Baum Bauer',
    heroTitle: 'Datenschutzerklärung von BioBaumBauer',
    intro: [
      'Bei Bio Baum Bauer, erreichbar über www.biobaumbauer.com, hat der Schutz deiner Daten höchste Priorität. Diese Datenschutzerklärung beschreibt, welche Informationen wir erfassen und wie wir sie nutzen.',
      'Sie gilt ausschließlich für unsere Online-Angebote und betrifft Besucherinnen und Besucher unserer Website in Bezug auf alle Daten, die sie dort mit uns teilen oder die wir erheben. Informationen, die wir offline oder über andere Kanäle erhalten, fallen nicht darunter.',
    ],
    sections: [
      {
        title: 'Einwilligung',
        paragraphs: [
          'Mit der Nutzung unserer Website erklärst du dich mit dieser Datenschutzerklärung einverstanden.',
        ],
      },
      {
        title: 'Welche Informationen wir sammeln',
        paragraphs: [
          'Wir machen deutlich, welche personenbezogenen Daten wir erfragen und warum, sobald wir um diese Angaben bitten.',
          'Wenn du uns direkt kontaktierst, erhalten wir gegebenenfalls zusätzliche Informationen wie deinen Namen, deine E-Mail-Adresse, Telefonnummer, den Inhalt deiner Nachricht sowie Anhänge oder weitere Angaben, die du mit uns teilst.',
          'Wenn du ein Konto anlegst, fragen wir unter Umständen nach Kontaktdaten wie Name, Firmenname, Anschrift, E-Mail-Adresse und Telefonnummer.',
        ],
      },
      {
        title: 'Wie wir deine Daten nutzen',
        paragraphs: ['Wir verwenden die gesammelten Informationen unter anderem, um:'],
        list: [
          'unsere Website bereitzustellen, zu betreiben und zu pflegen',
          'unsere Website zu verbessern, zu personalisieren und auszubauen',
          'zu verstehen und zu analysieren, wie unsere Website genutzt wird',
          'neue Produkte, Services und Funktionen zu entwickeln',
          'dich direkt oder über Partner zu kontaktieren – etwa für Support, Updates oder Marketinghinweise',
          'dir E-Mails zu senden',
          'Betrug zu erkennen und zu verhindern',
        ],
      },
      {
        title: 'Server-Logdateien',
        paragraphs: [
          'Wie viele andere Websites erfassen wir Logdateien. Diese protokollieren Besucher bei jedem Aufruf unserer Seiten. Erfasst werden unter anderem IP-Adresse, Browsertyp, Internetdienstanbieter, Datum und Uhrzeit, Verweis- / Ausstiegsseiten sowie eventuell die Anzahl der Klicks. Diese Informationen lassen sich nicht bestimmten Personen zuordnen und dienen ausschließlich der Analyse von Trends, der Verwaltung der Seite, dem Nachvollziehen von Bewegungen und dem Sammeln demografischer Daten.',
        ],
      },
      {
        title: 'Cookies und Web-Beacons',
        paragraphs: [
          'Auch wir setzen Cookies ein. Sie speichern beispielsweise Einstellungen der Besuchenden oder fest, welche Seiten aufgerufen wurden. So können wir Inhalte anpassen und das Nutzererlebnis optimieren.',
        ],
      },
      {
        title: 'Datenschutzrichtlinien unserer Werbepartner',
        paragraphs: [
          'Eine aktuelle Liste unserer Werbepartner sowie deren Datenschutzbestimmungen kannst du jederzeit einsehen.',
          'Drittanbieter verwenden Cookies, JavaScript oder Web-Beacons innerhalb ihrer Anzeigen und Links auf Bio Baum Bauer. Diese Technologien übermitteln automatisch deine IP-Adresse und helfen dabei, Kampagnen zu messen oder Werbung zu personalisieren.',
          'Bitte beachte, dass wir keinen Zugriff auf diese Cookies haben und sie nicht kontrollieren können.',
        ],
      },
      {
        title: 'Datenschutz von Drittanbietern',
        paragraphs: [
          'Unsere Datenschutzerklärung gilt nicht für andere Werbetreibende oder Websites. Wir empfehlen dir, die jeweiligen Richtlinien dieser Anbieter zu lesen – dort findest du auch Hinweise zum Opt-out.',
          'Cookies kannst du über die Einstellungen deines Browsers deaktivieren. Genauere Informationen findest du auf den Seiten der jeweiligen Browser-Anbieter.',
        ],
      },
      {
        title: 'CCPA-Datenschutzrechte (Verkauf personenbezogener Daten verhindern)',
        paragraphs: [
          'Verbraucherinnen und Verbraucher in Kalifornien haben unter anderem das Recht:',
        ],
        list: [
          'Auskunft über die Kategorien und konkreten personenbezogenen Daten zu verlangen, die ein Unternehmen gesammelt hat',
          'die Löschung personenbezogener Daten zu fordern',
          'den Verkauf personenbezogener Daten zu untersagen',
        ],
        closing:
          'Wir beantworten Anfragen innerhalb eines Monats. Wende dich gern an uns, wenn du diese Rechte ausüben möchtest.',
      },
      {
        title: 'DSGVO-Rechte',
        paragraphs: [
          'Du hast im Rahmen der Datenschutz-Grundverordnung folgende Rechte:',
        ],
        list: [
          'Auskunft – du kannst eine Kopie deiner personenbezogenen Daten anfordern (gegebenenfalls erheben wir dafür eine geringe Gebühr).',
          'Berichtigung – du kannst falsche oder unvollständige Daten korrigieren lassen.',
          'Löschung – du kannst beantragen, dass wir deine Daten unter bestimmten Voraussetzungen löschen.',
          'Einschränkung der Verarbeitung – du kannst verlangen, dass wir deine Daten nur eingeschränkt verarbeiten.',
          'Widerspruch – du kannst der Verarbeitung deiner Daten widersprechen.',
          'Datenübertragbarkeit – du kannst verlangen, dass wir deine Daten an dich oder eine andere Organisation übertragen.',
        ],
        closing:
          'Auch hier antworten wir innerhalb eines Monats. Kontaktiere uns, wenn du eines dieser Rechte ausüben möchtest.',
      },
      {
        title: 'Informationen zum Kinderschutz',
        paragraphs: [
          'Der Schutz von Kindern im Internet ist uns besonders wichtig. Wir ermutigen Eltern und Erziehungsberechtigte, die Online-Aktivitäten ihrer Kinder zu begleiten.',
          'Wir erheben wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Solltest du glauben, dass dein Kind uns solche Daten zur Verfügung gestellt hat, kontaktiere uns bitte umgehend, damit wir sie löschen können.',
        ],
      },
      {
        title: 'Änderungen dieser Datenschutzerklärung',
        paragraphs: [
          'Wir können diese Datenschutzerklärung gelegentlich aktualisieren. Bitte informiere dich regelmäßig über Änderungen. Anpassungen veröffentlichen wir auf dieser Seite und sie treten sofort in Kraft.',
        ],
        link: {
          prefix: 'Unsere Datenschutzerklärung wurde mit Hilfe des ',
          label: 'Privacy Policy Generator',
          href: 'https://www.privacypolicygenerator.info',
          suffix: ' erstellt.',
        },
      },
      {
        title: 'Kontakt',
        paragraphs: [
          'Wenn du Fragen oder Anregungen zu dieser Datenschutzerklärung hast, melde dich jederzeit bei uns.',
        ],
      },
    ],
  },
  en: {
    metaTitle: 'Privacy Policy | Bio Baum Bauer',
    heroTitle: 'Privacy Policy of BioBaumBauer',
    intro: [
      'At Bio Baum Bauer, accessible from www.biobaumbauer.com, protecting your privacy is one of our priorities. This document explains what information we collect and how we use it.',
      'This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they share and/or collect in Bio Baum Bauer. This policy does not apply to any information collected offline or via channels other than this website.',
    ],
    sections: [
      {
        title: 'Consent',
        paragraphs: [
          'By using our website, you hereby consent to our Privacy Policy and agree to its terms.',
        ],
      },
      {
        title: 'Information We Collect',
        paragraphs: [
          'The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide it.',
          'If you contact us directly, we may receive additional information such as your name, email address, phone number, the contents of your message, attachments you send us, and any other information you choose to provide.',
          'When you register for an account, we may ask for contact details including name, company name, address, email address, and telephone number.',
        ],
      },
      {
        title: 'How We Use Your Information',
        paragraphs: ['We use the information we collect in various ways, including to:'],
        list: [
          'Provide, operate, and maintain our website',
          'Improve, personalize, and expand our website',
          'Understand and analyze how you use our website',
          'Develop new products, services, features, and functionality',
          'Communicate with you for customer service, updates, and marketing',
          'Send you emails',
          'Find and prevent fraud',
        ],
      },
      {
        title: 'Log Files',
        paragraphs: [
          "Bio Baum Bauer follows a standard procedure of using log files. The information collected includes IP addresses, browser type, ISP, date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable and are used to analyze trends, administer the site, track users' movement on the website, and gather demographic information.",
        ],
      },
      {
        title: 'Cookies and Web Beacons',
        paragraphs: [
          'Like any other website, Bio Baum Bauer uses cookies to store information including visitors’ preferences and the pages on the website that visitors accessed or visited.',
        ],
      },
      {
        title: 'Advertising Partners Privacy Policies',
        paragraphs: [
          'You may consult this list to find the Privacy Policy for each of the advertising partners of Bio Baum Bauer.',
          'Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on Bio Baum Bauer. They automatically receive your IP address when this occurs.',
          'Note that Bio Baum Bauer has no access to or control over these cookies that are used by third-party advertisers.',
        ],
      },
      {
        title: 'Third-Party Privacy Policies',
        paragraphs: [
          "Bio Baum Bauer's Privacy Policy does not apply to other advertisers or websites. We advise you to consult the respective Privacy Policies of these third-party ad servers for more detailed information.",
          'You can choose to disable cookies through your individual browser options. More detailed information about cookie management can be found on the browsers’ respective websites.',
        ],
      },
      {
        title: 'CCPA Privacy Rights (Do Not Sell My Personal Information)',
        paragraphs: [
          'Under the CCPA, among other rights, California consumers have the right to:',
        ],
        list: [
          'Request that a business disclose the categories and specific pieces of personal data that it has collected about consumers.',
          'Request that a business delete any personal data about the consumer that the business has collected.',
          'Request that a business that sells a consumer’s personal data not sell the consumer’s personal data.',
        ],
        closing:
          'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
      },
      {
        title: 'GDPR Data Protection Rights',
        paragraphs: [
          'We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:',
        ],
        list: [
          'The right to access – You have the right to request copies of your personal data.',
          'The right to rectification – You have the right to request that we correct any information you believe is inaccurate.',
          'The right to erasure – You have the right to request that we erase your personal data, under certain conditions.',
          'The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.',
          'The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.',
          'The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.',
        ],
        closing:
          'If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.',
      },
      {
        title: "Children's Information",
        paragraphs: [
          'Another part of our priority is adding protection for children while using the internet.',
          'Bio Baum Bauer does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information, please contact us immediately and we will remove it.',
        ],
      },
      {
        title: 'Changes to This Privacy Policy',
        paragraphs: [
          'We may update our Privacy Policy from time to time. We encourage you to review this page periodically for any changes.',
        ],
        link: {
          prefix: 'Our Privacy Policy was created with the help of the ',
          label: 'Privacy Policy Generator',
          href: 'https://www.privacypolicygenerator.info',
          suffix: '.',
        },
      },
      {
        title: 'Contact Us',
        paragraphs: [
          'If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.',
        ],
      },
    ],
  },
};

export default function Privacy() {
  const text = useCopy(copy);

  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
      </Helmet>

      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='text-stone bg-cover bg-center bg-no-repeat leading-7'
      >
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          className='p-5 md:py-12'
        >
          <div
            className='mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-md p-10 shadow-sm md:p-16'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <h1 className='text-accent font-chicle text-3xl tracking-wide md:text-4xl'>
              {text.heroTitle}
            </h1>
            {text.intro.map(paragraph => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {text.sections.map(section => (
              <div key={section.title}>
                <h2 className='mt-4 text-3xl tracking-wide'>{section.title}</h2>
                {section.paragraphs?.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul className='list-disc space-y-2 pl-5'>
                    {section.list.map(item => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.closing && <p>{section.closing}</p>}
                {section.link && (
                  <p>
                    {section.link.prefix}
                    <a href={section.link.href}>{section.link.label}</a>
                    {section.link.suffix}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
