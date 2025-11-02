const HEIGHT_MAP = {
  screen: 'h-screen',
  full: 'h-full',
  60: 'h-60',
};

export default function Spinner({ height = 'screen' }) {
  const heightClass = HEIGHT_MAP[height];

  return (
    <div className={`flex ${heightClass} items-center justify-center`}>
      <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900' />
    </div>
  );
}
