import Tree from '#src/models/tree.js';

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

const syncImageUrlAfterHook = async (response, _request, context) => {
  const adminRecord = context?.record;
  if (!adminRecord) return response;

  const key = adminRecord.params?.imageKey;
  if (!key) return response;

  const bucket =
    adminRecord.params?.imageBucket || process.env.AWS_S3_BUCKET || null;
  const region = process.env.AWS_S3_REGION;
  const imageUrl = buildPublicUrl(
    key,
    bucket,
    region,
    process.env.AWS_S3_PUBLIC_BASE_URL
  );

  if (!imageUrl || adminRecord.params?.imageUrl === imageUrl) {
    return response;
  }

  await adminRecord.update({ imageUrl });

  adminRecord.params.imageUrl = imageUrl;
  return {
    ...response,
    record: adminRecord.toJSON(context?.currentAdmin),
  };
};

const restoreStoredImageUrl = async response => {
  const record = response?.record;
  if (!record?.id) return response;

  const tree = await Tree.findById(record.id).select('imageUrl').lean();
  if (tree?.imageUrl) {
    record.params = record.params || {};
    record.params.imageUrl = tree.imageUrl;
  }
  return response;
};

const restoreStoredImageUrls = async response => {
  const records = response?.records;
  if (!records?.length) return response;

  const idList = records
    .map(record => record?.id)
    .filter(id => typeof id === 'string');

  if (!idList.length) return response;

  const trees = await Tree.find({ _id: { $in: idList } })
    .select('imageUrl')
    .lean();
  const imageUrlMap = new Map(
    trees.map(tree => [tree._id.toString(), tree.imageUrl])
  );

  records.forEach(record => {
    const url = imageUrlMap.get(record?.id);
    if (url) {
      record.params = record.params || {};
      record.params.imageUrl = url;
    }
  });

  return response;
};

export { syncImageUrlAfterHook, restoreStoredImageUrl, restoreStoredImageUrls };
