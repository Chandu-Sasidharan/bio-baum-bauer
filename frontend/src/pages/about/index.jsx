import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '@/components/ui/button';
import Breadcrumbs from '@/components/breadcrumbs';
import backgroundImage from '/images/background/leaves-background.webp';
import treeIcon from '/images/misc/tree.png';

export default function AboutUs() {
  return (
    <>
      <Helmet>
        <title>About Us | Bio Baum Bauer</title>
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
                About BioBaumBauer
              </h1>
              <p className='text-stone leading-7'>
                Nestled in the verdant valleys of Southern Germany, BioBaumBauer
                (an initiative of Solawi Zabergäu) is more than just a farm - we
                are a community dedicated to restoring balance between people
                and the natural world. Our journey began with a simple yet
                profound vision - to foster a greener tomorrow, one tree at a
                time. Over the years, we have grown from a small collective of
                eco-conscious individuals into a vibrant hub where sustainable
                agriculture, education, and community engagement thrive.
              </p>
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                Our Roots
              </h2>
              <p className='text-stone leading-7'>
                Guided by our mission of “Empowering Growth, Nurturing
                Sustainability,” we aim to reconnect people with nature in
                meaningful ways. Each tree we plant is a symbol of hope -
                absorbing carbon dioxide, restoring local biodiversity, and
                inspiring collective responsibility. By turning sponsorship into
                tangible environmental action, we bridge the gap between urban
                life and rural ecosystems, ensuring that every seedling
                contributes to a healthier planet for future generations.
              </p>
              <div className='mt-3 flex flex-col gap-2'>
                <h2 className='font-chicle text-2xl font-semibold tracking-wide md:text-3xl'>
                  What We Do
                </h2>
                <div>
                  <h3 className='mb-1 text-lg font-semibold'>
                    1. Sustainable Farming:
                  </h3>
                  <p className='text-stone leading-7'>
                    Our practices are grounded in organic methods that respect
                    the land. By avoiding synthetic pesticides and fertilizers,
                    we preserve soil fertility, protect local wildlife, and
                    offer healthier produce to our community.
                  </p>
                </div>
                <div>
                  <h3 className='mb-1 text-lg font-semibold'>
                    2. Community Engagement:
                  </h3>
                  <p className='text-stone leading-7'>
                    We believe that everyone has a role to play in environmental
                    stewardship. From hands-on workshops and school visits to
                    open farm days, we invite communities to learn, participate,
                    and share in the joy of caring for our shared home.
                  </p>
                </div>
                <div>
                  <h3 className='mb-1 text-lg font-semibold'>
                    3. Sponsor a Tree:
                  </h3>
                  <p className='text-stone leading-7'>
                    Through our sponsorship program, individuals and
                    organizations can directly support tree planting efforts in
                    Southern Germany. Each sponsor receives updates on their
                    tree’s growth and a certificate commemorating their
                    commitment to a greener world.
                  </p>
                </div>
              </div>
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                Our Vision
              </h2>
              <p className='text-stone leading-7'>
                We envision a world where humanity thrives in harmony with
                nature. Through sustainable practices, education, and active
                community engagement, we aim to cultivate a legacy of ecological
                balance and social empowerment, ensuring a vibrant and
                sustainable future for all.
              </p>
              <h2 className='font-chicle mt-3 text-2xl font-semibold tracking-wide md:text-3xl'>
                Join Us
              </h2>
              <p className='text-stone leading-7'>
                When you become a part of BioBaumBauer, you are not just
                planting a tree - you are sowing the seeds of hope, resilience,
                and lasting change. We invite you to stand with us, sponsor a
                tree, and help shape a world where people and planet flourish
                together. Let us grow a greener tomorrow, one tree at a time.
              </p>
              <Link to='/trees'>
                <Button
                  variant='primary'
                  className='bg-primary-light mt-5 w-fit'
                >
                  <img src={treeIcon} alt='Tree Icon' className='h-5 w-5' />
                  <span>Plant a Tree Today</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
