import { Link } from 'react-router-dom';
import { GoSponsorTiers } from 'react-icons/go';
import '../../assets/styles/homeComponents.css';

const FeatureTreeItem = props => {
  const { image, name, price, id } = props;
  return (
    <div className='p-6 md:p-0 md:pb-9 w-11/12 md:w-5/12 lg:w-1/5 mx-auto '>
      <Link to={`/trees/${id}`} className=''>
        <div className='linkContent rounded-md flex flex-col'>
          <img
            src={image}
            alt='Tree Imag'
            className=' w-full h-56 object-cover rounded-t-md'
          />
          <div className='p-3 flex flex-col gap-4'>
            <div className='flex justify-between pt-3'>
              <p className='text-xl px-1 py-0 font-bold text-accent'>{name}</p>
              <p className='text-lg px-4 py-1 price rounded-3xl font-bold flex items-center'>
                {price}&nbsp;€
              </p>
            </div>
            <div className='py-3 px-1 w-full'>
              <button className='flex items-center gap-2 border-2 hover:border-2 justify-center text-xl px-8 py-2 bg-primary text-stone rounded-xl hover:bg-primary-light transition duration-4000 ease-linear w-full'>
                <GoSponsorTiers />
                <span>sponsor</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default FeatureTreeItem;
