import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/button';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';
import useCopy from '@/hooks/use-copy';
import useLocalizedPath from '@/hooks/use-localized-path';

const copy = {
  de: {
    metaTitle: 'Über uns | Bio Baum Bauer',
    heading: 'Über BioBaumBauer',
    introParagraphs: [
      'Im grünen Zabergäu in Süddeutschland ist BioBaumBauer (eine Initiative der Solawi Zabergäu) weit mehr als nur ein Hof – wir sind eine Gemeinschaft, die das Gleichgewicht zwischen Mensch und Natur wiederherstellen möchte. Unsere Reise begann mit einer einfachen, aber tiefgreifenden Vision: eine grünere Zukunft zu gestalten, Baum für Baum. Aus einer kleinen Gemeinschaft engagierter Menschen ist ein lebendiger Ort geworden, an dem nachhaltige Landwirtschaft, Bildung und gemeinschaftliches Engagement zusammenfinden.',
    ],
    roots: {
      title: 'Unsere Wurzeln',
      body: 'Geleitet von unserer Mission „Wachstum fördern, Nachhaltigkeit stärken“ möchten wir Menschen auf sinnvolle Weise mit der Natur verbinden. Jeder Baum, den wir pflanzen, steht für Hoffnung: Er bindet CO₂, stärkt die Biodiversität und ruft zu gemeinsamer Verantwortung auf. Mit jeder Patenschaft verwandeln wir Engagement in konkrete Umweltmaßnahmen und schlagen eine Brücke zwischen Stadt und Land, damit jede junge Pflanze zu einer gesunden Zukunft beiträgt.',
    },
    focusTitle: 'Was wir tun',
    focusAreas: [
      {
        title: '1. Nachhaltige Landwirtschaft',
        body: 'Unsere Arbeit basiert auf biologischen Methoden, die das Land respektieren. Ohne synthetische Pestizide und Dünger bewahren wir die Bodengesundheit, schützen Tiere und liefern unserer Gemeinschaft gesunde Lebensmittel.',
      },
      {
        title: '2. Gemeinschaft stärken',
        body: 'Wir glauben, dass jede Person Verantwortung für den Planeten übernehmen kann. Durch Workshops, Schulbesuche und Tage der offenen Tür laden wir dazu ein, zu lernen, mitzumachen und die Freude am gemeinsamen Handeln zu erleben.',
      },
      {
        title: '3. Baumpatenschaften',
        body: 'Über unsere Patenschaftsprogramme können Menschen und Organisationen direkt unsere Aufforstungsprojekte in Süddeutschland unterstützen. Jeder Pate erhält Updates zum Baumwachstum sowie eine Urkunde als Zeichen ihres Engagements.',
      },
    ],
    vision: {
      title: 'Unsere Vision',
      body: 'Wir möchten eine Welt schaffen, in der Mensch und Natur im Einklang leben. Durch nachhaltiges Handeln, Wissensvermittlung und aktives Mitmachen fördern wir ein Gleichgewicht zwischen Ökologie und Gesellschaft – für eine lebenswerte Zukunft.',
    },
    join: {
      title: 'Mach mit',
      body: 'Wer Teil von BioBaumBauer wird, pflanzt nicht nur einen Baum – er sät Hoffnung, Resilienz und nachhaltigen Wandel. Werde Baumpate und gestalte mit uns eine Welt, in der Menschen und Natur gemeinsam wachsen.',
    },
    cta: 'Jetzt einen Baum pflanzen',
  },
  en: {
    metaTitle: 'About Us | Bio Baum Bauer',
    heading: 'About BioBaumBauer',
    introParagraphs: [
      'Nestled in the verdant valleys of Southern Germany, BioBaumBauer (an initiative of Solawi Zabergäu) is more than just a farm - we are a community dedicated to restoring balance between people and the natural world. Our journey began with a simple yet profound vision - to foster a greener tomorrow, one tree at a time. Over the years, we have grown from a small collective of eco-conscious individuals into a vibrant hub where sustainable agriculture, education, and community engagement thrive.',
    ],
    roots: {
      title: 'Our Roots',
      body: 'Guided by our mission of “Empowering Growth, Nurturing Sustainability,” we aim to reconnect people with nature in meaningful ways. Each tree we plant is a symbol of hope - absorbing carbon dioxide, restoring local biodiversity, and inspiring collective responsibility. By turning sponsorship into tangible environmental action, we bridge the gap between urban life and rural ecosystems, ensuring that every seedling contributes to a healthier planet for future generations.',
    },
    focusTitle: 'What We Do',
    focusAreas: [
      {
        title: '1. Sustainable Farming',
        body: 'Our practices are grounded in organic methods that respect the land. By avoiding synthetic pesticides and fertilizers, we preserve soil fertility, protect local wildlife, and offer healthier produce to our community.',
      },
      {
        title: '2. Community Engagement',
        body: 'We believe that everyone has a role to play in environmental stewardship. From hands-on workshops and school visits to open farm days, we invite communities to learn, participate, and share in the joy of caring for our shared home.',
      },
      {
        title: '3. Sponsor a Tree',
        body: 'Through our sponsorship program, individuals and organizations can directly support tree planting efforts in Southern Germany. Each sponsor receives updates on their tree’s growth and a certificate commemorating their commitment to a greener world.',
      },
    ],
    vision: {
      title: 'Our Vision',
      body: 'We envision a world where humanity thrives in harmony with nature. Through sustainable practices, education, and active community engagement, we aim to cultivate a legacy of ecological balance and social empowerment, ensuring a vibrant and sustainable future for all.',
    },
    join: {
      title: 'Join Us',
      body: 'When you become a part of BioBaumBauer, you are not just planting a tree - you are sowing the seeds of hope, resilience, and lasting change. We invite you to stand with us, sponsor a tree, and help shape a world where people and planet flourish together. Let us grow a greener tomorrow, one tree at a time.',
    },
    cta: 'Plant a Tree Today',
  },
};

export default function AboutUs() {
  const text = useCopy(copy);
  const { buildPath } = useLocalizedPath();
  return (
    <>
      <Helmet>
        <title>{text.metaTitle}</title>
      </Helmet>

      {/* Container */}
      <section
        style={{ backgroundImage: `url(${backgroundImage})` }}
        className='bg-cover bg-center bg-no-repeat'
      >
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          {/* Breadcrumbs */}
          <div className='w-full px-5'>
            <Breadcrumbs />
          </div>

          {/* Content */}
          <div className='px-5 py-10'>
            <div
              className='mx-auto flex w-full max-w-7xl flex-col gap-2 rounded-md p-10 shadow-sm md:p-16'
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
            >
              <h1 className='font-chicle mb-1 text-3xl font-bold tracking-wide md:text-4xl'>
                {text.heading}
              </h1>
              {text.introParagraphs.map(paragraph => (
                <p key={paragraph} className='text-stone leading-7'>
                  {paragraph}
                </p>
              ))}
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                {text.roots.title}
              </h2>
              <p className='text-stone leading-7'>{text.roots.body}</p>
              <div className='mt-3 flex flex-col gap-2'>
                <h2 className='font-chicle text-2xl font-semibold tracking-wide md:text-3xl'>
                  {text.focusTitle}
                </h2>
                {text.focusAreas.map(area => (
                  <div key={area.title}>
                    <h3 className='mb-1 text-lg font-semibold'>{area.title}</h3>
                    <p className='text-stone leading-7'>{area.body}</p>
                  </div>
                ))}
              </div>
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                {text.vision.title}
              </h2>
              <p className='text-stone leading-7'>{text.vision.body}</p>
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                {text.join.title}
              </h2>
              <p className='text-stone leading-7'>{text.join.body}</p>
              <Link to={buildPath('trees')}>
                <Button
                  variant='primary'
                  className='bg-primary-light mt-5 w-fit'
                >
                  <img src={treeIcon} alt='Tree Icon' className='h-5 w-5' />
                  <span>{text.cta}</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
