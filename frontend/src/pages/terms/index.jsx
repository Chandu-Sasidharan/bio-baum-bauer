import { Helmet } from 'react-helmet-async';
import backgroundImage from '/images/background/leaves-background.webp';
import useCopy from '@/hooks/use-copy';

const copy = {
  de: {
    metaTitle: 'AGB | Bio Baum Bauer',
    heroTitle: 'Willkommen bei Bio Baum Bauer!',
    intro: [
      'Diese Allgemeinen Geschäftsbedingungen beschreiben die Regeln für die Nutzung der Website von Solawi Zabergäu unter www.biobaumbauer.com.',
      'Mit dem Zugriff auf unsere Website erklärst du dich mit allen Bedingungen einverstanden. Bitte nutze Bio Baum Bauer nicht weiter, wenn du diesen Bestimmungen nicht zustimmst.',
      'Die Begriffe „Kunde“, „du“ und „dein“ beziehen sich auf dich als Nutzerin oder Nutzer der Website. „Wir“, „uns“ und „unser“ beziehen sich auf Bio Baum Bauer. Die Begriffe gelten unabhängig von Singular/Plural oder der gewählten Ansprache.',
    ],
    sections: [
      {
        title: 'Cookies',
        paragraphs: [
          'Wir verwenden Cookies. Mit der Nutzung unserer Website stimmst du der Verwendung gemäß unserer Datenschutzerklärung zu.',
          'Viele interaktive Websites nutzen Cookies, um wiederkehrende Besucher zu erkennen und Funktionen bereitzustellen. Einige unserer Partner im Bereich Werbung oder Affiliates setzen ebenfalls Cookies ein.',
        ],
      },
      {
        title: 'Lizenz',
        paragraphs: [
          'Sofern nicht anders angegeben, liegen alle geistigen Eigentumsrechte an den Inhalten von Bio Baum Bauer bei Solawi Zabergäu bzw. Lizenzgebern. Du darfst Inhalte nur für den persönlichen Gebrauch verwenden und musst folgende Einschränkungen beachten:',
        ],
        lists: [
          {
            items: [
              'Inhalte nicht erneut veröffentlichen',
              'Inhalte nicht verkaufen, vermieten oder unterlizenzieren',
              'Inhalte nicht reproduzieren oder duplizieren',
              'Inhalte nicht weiterverbreiten',
            ],
          },
        ],
        closing:
          'Diese Vereinbarung tritt mit dem Datum deines ersten Website-Besuchs in Kraft. Unsere Bedingungen wurden mit Hilfe eines AGB-Generators erstellt.',
      },
      {
        title: 'Kommentare',
        paragraphs: [
          'In einigen Bereichen der Website können Nutzer Kommentare hinterlassen. Diese spiegeln nicht zwingend die Meinung von Solawi Zabergäu wider. Wir übernehmen keine Haftung für Kommentare oder daraus entstehende Schäden.',
          'Wir behalten uns vor, Kommentare zu prüfen und diejenigen zu entfernen, die unangemessen, beleidigend oder rechtswidrig sind.',
          'Du versicherst und gewährleistest, dass:',
        ],
        lists: [
          {
            items: [
              'du berechtigt bist, Kommentare zu veröffentlichen und alle nötigen Rechte besitzt',
              'Kommentare keine Rechte Dritter verletzen (z. B. Urheberrecht, Markenrecht)',
              'Kommentare nicht verleumderisch, beleidigend, obszön oder gesetzeswidrig sind',
              'Kommentare nicht zur Werbung oder zu illegalen Aktivitäten genutzt werden',
            ],
          },
        ],
        closing:
          'Du gewährst Solawi Zabergäu eine nicht-exklusive Lizenz, Kommentare in allen Medien zu nutzen, zu bearbeiten und weiterzugeben.',
      },
      {
        title: 'Verlinkung auf unsere Inhalte',
        paragraphs: [
          'Folgende Organisationen dürfen ohne vorherige schriftliche Zustimmung auf unsere Website verlinken:',
        ],
        lists: [
          {
            items: [
              'Behörden',
              'Suchmaschinen',
              'Nachrichtenorganisationen',
              'Online-Verzeichnisse in gleicher Weise wie bei anderen Unternehmen',
              'Anerkannte Unternehmen (ausgenommen werbende Non-Profit-Organisationen)',
            ],
          },
          {
            intro:
              'Wir können weitere Anfragen folgender Organisationen prüfen und genehmigen:',
            items: [
              'allgemein bekannte Verbraucher- oder Wirtschaftsquellen',
              'Community-Portale',
              'Verbände oder Gruppen mit gemeinnützigem Fokus',
              'Online-Verzeichnisanbieter',
              'Internet-Portale',
              'Steuerberater, Rechts- und Beratungsfirmen',
              'Bildungs- und Branchenverbände',
            ],
          },
        ],
        closing:
          'Links müssen sachlich richtig sein, dürfen keine falsche Unterstützung suggerieren und müssen zum Kontext der verlinkenden Seite passen. Anfragen bitte per E-Mail mit Angabe der URLs, die verlinkt werden sollen. Genehmigte Organisationen dürfen unseren Firmennamen, die URL oder eine passende Beschreibung verwenden. Die Nutzung unseres Logos bedarf einer gesonderten Lizenz.',
      },
      {
        title: 'iFrames',
        paragraphs: [
          'Ohne vorherige schriftliche Genehmigung darfst du keine Frames erstellen, die das Erscheinungsbild unserer Website verändern.',
        ],
      },
      {
        title: 'Haftung für Inhalte',
        paragraphs: [
          'Wir übernehmen keine Verantwortung für Inhalte, die auf deiner Website erscheinen. Du verpflichtest dich, uns vor Ansprüchen aus solchen Inhalten zu schützen. Es dürfen keine Links platziert werden, die als beleidigend, strafbar oder rechtsverletzend ausgelegt werden könnten.',
        ],
      },
      {
        title: 'Vorbehalt von Rechten',
        paragraphs: [
          'Wir können verlangen, dass du Links zu unserer Website entfernst. Nach Aufforderung musst du Links umgehend löschen. Wir können diese Bedingungen und unsere Link-Richtlinie jederzeit ändern. Durch das fortgesetzte Verlinken erklärst du dich mit den Änderungen einverstanden.',
        ],
      },
      {
        title: 'Entfernung von Links',
        paragraphs: [
          'Solltest du einen Link auf unserer Website als anstößig empfinden, informiere uns bitte. Wir prüfen dein Anliegen, sind jedoch nicht verpflichtet, Links zu entfernen oder direkt zu antworten.',
          'Wir garantieren weder die Richtigkeit noch die Vollständigkeit der Inhalte und sichern auch nicht zu, dass die Website dauerhaft verfügbar ist.',
        ],
      },
      {
        title: 'Haftungsausschluss',
        paragraphs: [
          'Soweit gesetzlich zulässig, schließen wir alle Zusicherungen und Gewährleistungen in Bezug auf unsere Website aus. Nichts in diesem Haftungsausschluss soll unsere oder deine Haftung beschränken oder ausschließen für:',
        ],
        lists: [
          {
            items: [
              'Tod oder Personenschaden durch Fahrlässigkeit',
              'Betrug oder arglistige Täuschung',
              'sonstige Haftungen, die gesetzlich nicht beschränkt werden dürfen',
            ],
          },
        ],
        closing:
          'Solange die Website sowie Informationen und Dienste unentgeltlich bereitgestellt werden, haften wir nicht für Verluste oder Schäden irgendeiner Art.',
      },
    ],
  },
  en: {
    metaTitle: 'Terms and Conditions | Bio Baum Bauer',
    heroTitle: 'Welcome to Bio Baum Bauer!',
    intro: [
      'These terms and conditions outline the rules and regulations for the use of Solawi Zabergäu’s website at www.biobaumbauer.com.',
      'By accessing this site we assume you accept these terms. Do not continue to use Bio Baum Bauer if you do not agree to all of the conditions stated here.',
      'The terminology “Client”, “You”, “Your”, “We”, “Ourselves”, “Our” and “Us” refers to the client and to Bio Baum Bauer respectively.',
    ],
    sections: [
      {
        title: 'Cookies',
        paragraphs: [
          'We employ the use of cookies. By accessing Bio Baum Bauer, you agreed to use cookies in agreement with our Privacy Policy.',
          'Most interactive websites use cookies to let us retrieve user details for each visit. Cookies enable certain areas of the website to function properly, and some partners may also use cookies.',
        ],
      },
      {
        title: 'License',
        paragraphs: [
          'Unless otherwise stated, Solawi Zabergäu and/or its licensors own the intellectual property rights for all material on Bio Baum Bauer. All rights are reserved. You may access the site for personal use subject to the following restrictions:',
        ],
        lists: [
          {
            items: [
              'Republish material from Bio Baum Bauer',
              'Sell, rent, or sub-license material',
              'Reproduce, duplicate, or copy material',
              'Redistribute content',
            ],
          },
        ],
        closing:
          'This agreement begins on the date hereof. Our Terms and Conditions were created with the help of a generator.',
      },
      {
        title: 'Comments',
        paragraphs: [
          'Parts of this website offer users the opportunity to post comments. Comments do not reflect the views of Solawi Zabergäu, and we are not liable for them.',
          'We reserve the right to monitor and remove comments we consider inappropriate, offensive, or in breach of these terms.',
          'You warrant that:',
        ],
        lists: [
          {
            items: [
              'You have the right to post the comments',
              'The comments do not infringe intellectual property rights',
              'The comments are not defamatory, libelous, offensive, or unlawful',
              'The comments are not used to solicit or promote business or illegal activity',
            ],
          },
        ],
        closing:
          'You grant Solawi Zabergäu a non-exclusive license to use, reproduce, and edit any of your comments in all media.',
      },
      {
        title: 'Hyperlinking to our Content',
        paragraphs: [
          'The following organizations may link to our Website without prior approval:',
        ],
        lists: [
          {
            items: [
              'Government agencies',
              'Search engines',
              'News organizations',
              'Online directory distributors',
              'Accredited businesses (excluding soliciting non-profits)',
            ],
          },
          {
            intro: 'We may also consider link requests from the following:',
            items: [
              'Consumer and/or business information sources',
              'Dot.com community sites',
              'Charitable associations',
              'Online directories',
              'Internet portals',
              'Accounting, law, and consulting firms',
              'Educational institutions and trade associations',
            ],
          },
        ],
        closing:
          'Links must not be deceptive or falsely imply sponsorship. Requests can be sent via email with details of the URLs to be linked.',
      },
      {
        title: 'iFrames',
        paragraphs: [
          'Without prior approval, you may not create frames around our webpages that alter the visual presentation of our site.',
        ],
      },
      {
        title: 'Content Liability',
        paragraphs: [
          'We will not be held responsible for content that appears on your website. You agree to defend us against claims arising from your content.',
        ],
      },
      {
        title: 'Reservation of Rights',
        paragraphs: [
          'We reserve the right to request the removal of any link to our website. By linking to us, you agree to follow these linking terms and conditions.',
        ],
      },
      {
        title: 'Removal of links from our website',
        paragraphs: [
          'If you find any link offensive, please contact us. We will consider requests but are not obligated to remove links or respond directly.',
          'We do not guarantee that the information on this website is correct or complete, nor that the site remains available.',
        ],
      },
      {
        title: 'Disclaimer',
        paragraphs: [
          'To the maximum extent permitted by law, we exclude all representations and warranties relating to our website. Nothing in this disclaimer will:',
        ],
        lists: [
          {
            items: [
              'Limit or exclude liability for death or personal injury',
              'Limit or exclude liability for fraud or fraudulent misrepresentation',
              'Limit liabilities not permitted under applicable law',
              'Exclude liabilities that may not be excluded under applicable law',
            ],
          },
        ],
        closing:
          'As long as the website and services are provided free of charge, we will not be liable for any loss or damage of any nature.',
      },
    ],
  },
};

export default function Terms() {
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
                <h2 className='mt-6 text-3xl font-semibold'>
                  <strong>{section.title}</strong>
                </h2>
                {section.paragraphs?.map(paragraph => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.lists?.map(list => (
                  <div key={list.intro || list.items[0]}>
                    {list.intro && <p>{list.intro}</p>}
                    <ul className='list-disc space-y-2 pl-5'>
                      {list.items.map(item => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                {section.closing && <p>{section.closing}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
