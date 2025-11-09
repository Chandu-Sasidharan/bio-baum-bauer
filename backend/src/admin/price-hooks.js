const normalizeDecimalPrice = record => {
  const params = record?.params ?? {};
  const priceParam = params.price ?? params['price.$numberDecimal'];
  if (!priceParam) return record;

  if (typeof priceParam === 'object' && '$numberDecimal' in priceParam) {
    const val = priceParam.$numberDecimal;
    record.params.price = val;
    record.params['price.$numberDecimal'] = val;
    return record;
  }

  if (typeof priceParam === 'string') {
    record.params.price = priceParam;
    record.params['price.$numberDecimal'] = priceParam;
  }

  return record;
};

const afterHookConvertPrice = async response => {
  if (response.record) {
    response.record = normalizeDecimalPrice(response.record);
  }

  if (response.records) {
    response.records = response.records.map(normalizeDecimalPrice);
  }

  return response;
};

const beforeHookNormalizePrice = async request => {
  const price = request.payload?.price;
  if (price !== undefined && price !== null && price !== '') {
    return {
      ...request,
      payload: { ...request.payload, price: price.toString() },
    };
  }

  return request;
};

export {
  normalizeDecimalPrice,
  afterHookConvertPrice,
  beforeHookNormalizePrice,
};
