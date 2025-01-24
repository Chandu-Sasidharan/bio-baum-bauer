export default function Spinner({ height = 'screen' }) {
  return (
    <div className={`flex h-${height} items-center justify-center`}>
      <div className='h-32 w-32 animate-spin rounded-full border-b-2 border-t-2 border-gray-900'></div>
    </div>
  );
}
