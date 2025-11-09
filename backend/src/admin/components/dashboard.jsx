import { useEffect, useState } from 'react';
import { ApiClient } from 'adminjs';
import { Box, H3, Text, Loader } from '@adminjs/design-system';

const CARD_SHADOW = '0 8px 20px rgba(15, 23, 42, 0.08)';
const CARD_HOVER_SHADOW = '0 14px 30px rgba(15, 23, 42, 0.16)';

const resourceCardStyles = {
  bg: 'white',
  p: 'xl',
  borderRadius: 'lg',
  boxShadow: CARD_SHADOW,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.15s ease, box-shadow 0.15s ease',
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
            <Box
              as='a'
              href={`/admin/resources/${card.resourceId}/actions/list`}
              key={card.resourceId}
              {...resourceCardStyles}
              style={{
                cursor: 'pointer',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={event => {
                event.currentTarget.style.transform = 'translateY(-2px)';
                event.currentTarget.style.boxShadow = CARD_HOVER_SHADOW;
              }}
              onMouseLeave={event => {
                event.currentTarget.style.transform = 'translateY(0)';
                event.currentTarget.style.boxShadow = CARD_SHADOW;
              }}
            >
              <Text fontWeight='bold' mb='md'>
                {card.label}
              </Text>
              <Text fontSize={32} mb='md'>
                {card.count}
              </Text>
              <Text color='primary100'>View {card.label}</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
