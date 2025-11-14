const DEFAULT_PROPERTY_NAMES = {
  filePath: 'imageUrl',
  key: 'imageKey',
  bucket: 'imageBucket',
};

const stripTrailingSlash = value =>
  typeof value === 'string' ? value.replace(/\/+$/, '') : value;

const buildPublicUrl = (key, bucket, region, baseUrl) => {
  if (!key) return null;

  const sanitizedBase = stripTrailingSlash(baseUrl);
  if (sanitizedBase) {
    return `${sanitizedBase}/${key}`;
  }

  if (!bucket || !region) {
    return null;
  }

  return `https://${bucket}.s3.${region}.amazonaws.com/${key}`;
};

const createImageUrlHooks = ({ model, properties = {} } = {}) => {
  if (!model) {
    throw new Error('createImageUrlHooks requires a model');
  }

  const propertyNames = { ...DEFAULT_PROPERTY_NAMES, ...properties };
  const { filePath, key, bucket } = propertyNames;

  const syncImageUrlAfterHook = async (response, _request, context) => {
    const adminRecord = context?.record;
    if (!adminRecord) return response;

    const keyValue = adminRecord.params?.[key];
    if (!keyValue) return response;

    const bucketValue =
      adminRecord.params?.[bucket] || process.env.AWS_S3_BUCKET || null;
    const region = process.env.AWS_S3_REGION;
    const imageUrl = buildPublicUrl(
      keyValue,
      bucketValue,
      region,
      process.env.AWS_S3_PUBLIC_BASE_URL
    );

    if (!imageUrl || adminRecord.params?.[filePath] === imageUrl) {
      return response;
    }

    await adminRecord.update({ [filePath]: imageUrl });

    adminRecord.params[filePath] = imageUrl;
    return {
      ...response,
      record: adminRecord.toJSON(context?.currentAdmin),
    };
  };

  const restoreStoredImageUrl = async response => {
    const record = response?.record;
    if (!record?.id) return response;

    const doc = await model.findById(record.id).select(filePath).lean();
    const storedUrl = doc?.[filePath];
    if (storedUrl) {
      record.params = record.params || {};
      record.params[filePath] = storedUrl;
    }
    return response;
  };

  const restoreStoredImageUrls = async response => {
    const records = response?.records;
    if (!records?.length) return response;

    const ids = records
      .map(single => single?.id)
      .filter(id => typeof id === 'string');

    if (!ids.length) return response;

    const docs = await model
      .find({ _id: { $in: ids } })
      .select(filePath)
      .lean();

    const map = new Map(docs.map(doc => [doc._id.toString(), doc[filePath]]));

    records.forEach(single => {
      const storedUrl = map.get(single?.id);
      if (storedUrl) {
        single.params = single.params || {};
        single.params[filePath] = storedUrl;
      }
    });

    return response;
  };

  return {
    syncImageUrlAfterHook,
    restoreStoredImageUrl,
    restoreStoredImageUrls,
  };
};

export { createImageUrlHooks };
