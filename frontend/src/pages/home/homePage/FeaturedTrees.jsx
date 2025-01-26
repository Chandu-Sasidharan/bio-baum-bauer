import React, { useState, useEffect } from 'react';
import FeatureTreeItem from './FeatureTreeItem';
import DefaultLoader from '../../components/DefaultLoader';
import '../../assets/styles/homeComponents.css';
import { FeaturedTreeData } from '../../components/TreeData';

const FeaturedTrees = () => {
  const [featuredTree, setFeaturedTree] = useState([]);
  const [err, setErr] = useState('No data available yet!');
  const getFeaturedTree = async () => {
    try {
      const data = await FeaturedTreeData();
      setFeaturedTree(data.featuredTrees);
      setErr('');
    } catch (error) {
      setErr('No data available yet!');
    }
  };

  useEffect(() => {
    document.title = 'Home';
    getFeaturedTree();
  }, []);
  return (
    <div className='container mx-auto py-24 flex flex-col gap-9'>
      <h2 className='text-center text-3xl'>Featured Trees</h2>
      <p className='px-6 text-center font-semibold text-stone w-11/12 lg:w-3/4 mx-auto'>
        The following tree items are among the most rarely cultivated or they
        are the ones that need to be urgently taken care of.
      </p>
      <div className='flex flex-col justify-center items-center md:flex-row gap-4 md:flex-wrap'>
        {featuredTree.length <= 0 ? (
          <div className=' h-56 flex justify-center items-center'>
            <DefaultLoader errorMsg={err} />
          </div>
        ) : (
          featuredTree.map(tree => (
            <FeatureTreeItem
              key={tree._id}
              image={tree.image}
              name={tree.name}
              price={tree.price.$numberDecimal}
              id={tree._id}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default FeaturedTrees;
