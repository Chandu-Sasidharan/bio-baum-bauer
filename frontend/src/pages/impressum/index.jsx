import { Helmet } from 'react-helmet-async';
import backgroundImage from '/images/background/leaves-background.webp';

export default function Impressum() {
  return (
    <>
      <Helmet>
        <title>Impressum | Bio Baum Bauer</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='text-stone bg-cover bg-center bg-no-repeat leading-7'
      >
        {/* Semi-transparent background */}
        <div
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
          className='p-5 md:py-12'
        >
          <div
            className='mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-md p-10 shadow-sm md:p-16'
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
          >
            <h1 className='text-accent font-chicle text-3xl tracking-wide md:text-4xl'>
              Impressum
            </h1>
            <div className='space-y-1'>
              <p className='font-semibold'>BioBaumBauer</p>
              <p>
                <span className='font-semibold'>Rechtsform:</span> ...
              </p>
              <p>
                <span className='font-semibold'>Vertretungsberechtigt:</span>{' '}
                Stefanie Wolf
              </p>
            </div>

            <div className='mt-4 space-y-1'>
              <p className='font-semibold'>Anschrift</p>
              <p>Schulgasse 9</p>
              <p>74336 Brackenheim</p>
            </div>

            <div className='mt-4 space-y-1'>
              <p className='font-semibold'>Kontakt</p>
              <p>Telefon: 07135 933887</p>
              <p>
                E-Mail:{' '}
                <a
                  href='mailto:hello@biobaumbauer.de'
                  className='text-accent underline'
                >
                  hello@biobaumbauer.de
                </a>
              </p>
              <p>
                Web:{' '}
                <a
                  href='https://biobaumbauer.de/'
                  className='text-accent underline'
                >
                  https://biobaumbauer.de/
                </a>
              </p>
            </div>

            <div className='mt-4 space-y-1'>
              <p>
                <span className='font-semibold'>Öko-Kontrollstelle:</span>{' '}
                DE-ÖKO-022
              </p>
              <p>
                <span className='font-semibold'>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
                </span>{' '}
                ...
              </p>
              <p>
                <span className='font-semibold'>Registereintrag:</span> ...
              </p>
            </div>

            <h2 className='mt-6 text-3xl tracking-wide'>
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <div className='space-y-1'>
              <p>Stefanie Wolf</p>
              <p>Schulgasse 9</p>
              <p>74336 Brackenheim</p>
            </div>

            <h2 className='mt-6 text-3xl tracking-wide'>Haftung für Inhalte</h2>
            <p>
              Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene
              Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
              verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter
              jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde
              Informationen zu überwachen oder nach Umständen zu forschen, die
              auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur
              Entfernung oder Sperrung der Nutzung von Informationen nach den
              allgemeinen Gesetzen bleiben hiervon unberührt. Eine
              diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
              Kenntnis einer konkreten Rechtsverletzung möglich. Bei
              Bekanntwerden von entsprechenden Rechtsverletzungen werden wir
              diese Inhalte umgehend entfernen.
            </p>

            <h2 className='mt-6 text-3xl tracking-wide'>Haftung für Links</h2>
            <p>
              Unser Angebot enthält Links zu externen Websites Dritter, auf
              deren Inhalte wir keinen Einfluss haben. Deshalb können wir für
              diese fremden Inhalte auch keine Gewähr übernehmen. Für die
              Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter
              oder Betreiber der Seiten verantwortlich. Bei Bekanntwerden von
              Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </p>

            <h2 className='mt-6 text-3xl tracking-wide'>Urheberrecht</h2>
            <p>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
              diesen Seiten unterliegen dem deutschen Urheberrecht. Die
              Vervielfältigung, Bearbeitung, Verbreitung und jede Art der
              Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der
              schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
              Downloads und Kopien dieser Seite sind nur für den privaten, nicht
              kommerziellen Gebrauch gestattet.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
