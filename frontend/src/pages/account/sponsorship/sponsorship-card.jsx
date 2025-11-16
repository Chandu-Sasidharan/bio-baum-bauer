const STATUS_STYLES = {
  paid: 'bg-green-100 text-green-800 border-green-200',
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  failed: 'bg-red-100 text-red-800 border-red-200',
  needs_review: 'bg-orange-100 text-orange-800 border-orange-200',
};

const formatCurrency = (amount = 0, currency = 'EUR') => {
  const currencyCode = currency.toUpperCase();
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: currencyCode,
  }).format(amount / 100);
};

const formatDate = dateString => {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return '—';

  return date.toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const formatTaxRate = taxRate => {
  if (typeof taxRate !== 'number') return '—';
  return `${(taxRate * 100).toFixed(0)}%`;
};

export default function SponsorshipCard({ sponsorship }) {
  const {
    amount,
    currency,
    status,
    createdAt,
    taxRate,
    cartItems = [],
  } = sponsorship;
  const totalTrees = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const statusStyle =
    STATUS_STYLES[status] || 'bg-slate-100 text-slate-800 border-slate-200';
  const statusLabel = status?.replace('_', ' ') || 'unknown';

  return (
    <div className='rounded-md border border-primary/10 bg-white p-5 shadow-sm'>
      <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <div>
          <p className='text-xs uppercase tracking-wide text-stone'>
            Total amount charged
          </p>
          <p className='text-2xl font-semibold text-primary-dark'>
            {formatCurrency(amount, currency)}
          </p>
        </div>
        <span
          className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold capitalize ${statusStyle}`}
        >
          {statusLabel}
        </span>
      </div>

      <div className='mt-5 grid gap-4 text-sm sm:grid-cols-3'>
        <div>
          <p className='text-xs uppercase tracking-wide text-stone'>
            Trees sponsored
          </p>
          <p className='text-lg font-semibold text-primary-dark'>{totalTrees}</p>
        </div>
        <div>
          <p className='text-xs uppercase tracking-wide text-stone'>
            Created on
          </p>
          <p className='text-lg font-semibold text-primary-dark'>
            {formatDate(createdAt)}
          </p>
        </div>
        <div>
          <p className='text-xs uppercase tracking-wide text-stone'>Tax rate</p>
          <p className='text-lg font-semibold text-primary-dark'>
            {formatTaxRate(taxRate)}
          </p>
        </div>
      </div>

      {!!cartItems.length && (
        <>
          <hr className='my-5 border-dashed border-primary/30' />
          <div className='space-y-3'>
            <p className='text-xs uppercase tracking-wide text-stone'>
              Trees in this sponsorship
            </p>
            <ul className='space-y-2'>
              {cartItems.map((item, index) => {
                const tree = item.tree;
                const key = tree?.id || index;
                return (
                  <li
                    key={key}
                    className='flex items-start justify-between rounded border border-primary/10 bg-primary-light/30 p-3 text-sm'
                  >
                    <div>
                      <p className='font-semibold text-primary-dark'>
                        {tree?.name || 'Tree no longer available'}
                      </p>
                      {tree?.category && (
                        <p className='text-xs uppercase tracking-wide text-stone'>
                          {tree.category}
                        </p>
                      )}
                    </div>
                    <div className='text-right text-stone'>
                      <p className='font-semibold text-primary-dark'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
