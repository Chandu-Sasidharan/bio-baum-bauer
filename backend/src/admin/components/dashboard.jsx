import { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { Box, H3, Text, Link, Loader } from '@adminjs/design-system';

const resourceCardStyles = {
  bg: 'white',
  p: 'xl',
  borderRadius: 'lg',
  boxShadow: 'card',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const Dashboard = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const api = new ApiClient();

    api
      .getDashboard()
      .then(response => {
        setCards(response?.data?.cards ?? []);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <Box variant='grey'>
      <H3 mt='xl' mb='lg'>
        Overview
      </H3>
      {loading && <Loader />}
      {error && (
        <Box mt='lg' p='md' bg='errorLight' color='error'>
          Failed to load dashboard data.
        </Box>
      )}

      {!loading && !error && (
        <Box
          display='grid'
          gridGap='xl'
          gridTemplateColumns='repeat(auto-fit, minmax(240px, 1fr))'
        >
          {cards.map(card => (
            <Box key={card.resourceId} {...resourceCardStyles}>
              <Text fontWeight='bold' mb='md'>
                {card.label}
              </Text>
              <Text fontSize={32} mb='md'>
                {card.count}
              </Text>
              <Link
                href={`/admin/resources/${card.resourceId}`}
                variant='primary'
              >
                View {card.label}
              </Link>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
