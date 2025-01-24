import axios from '@/utils/axios';

/**
 *
 * @param {*} sessionId
 * @param {*} totalGrundPay
 * @param {*} userId
 * @param {*} taxRate
 */
export const addSponsorAndPayment = async (
  sessionId,
  totalGrundPay,
  userId,
  taxRate,
  patron,
  orders
) => {
  try {
    const response = await axios.post('/api/payment/create', {
      sessionId,
      totalGrundPay,
      userId,
      taxRate,
      patron,
      orders,
    });
    if (response.status === 201) {
      return response.data.newItems;
    } else {
      console.error('Unexpected response status:', response.status);
    }
  } catch (error) {
    console.error('EEE', error);
    throw error;
  }
};
