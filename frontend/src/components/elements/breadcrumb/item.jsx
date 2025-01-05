// Simple ChevronRight icon
const ChevronRight = () => (
  <svg
    className='text-accent mx-1 h-3 w-3 rtl:rotate-180'
    aria-hidden='true'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 6 10'
  >
    <path
      stroke='currentColor'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='m1 9 4-4-4-4'
    />
  </svg>
);

/**
 * BreadcrumbItem
 *
 * - If `current` is true, renders a <span aria-current="page"> instead of an <a>.
 * - Optionally show a leading chevron if this is NOT the first item.
 *
 * Props:
 * - `href` (string): The link to navigate to (if not current).
 * - `current` (boolean): Whether this item is the current page.
 * - `isFirst` (boolean): Internal use. True if this is the first item (suppresses the chevron).
 * - `children` (ReactNode): The text or icon+text for the breadcrumb link.
 */
export function BreadcrumbItem({ href, current = false, children, ...props }) {
  return (
    <li className='flex items-center' {...props}>
      {current ? (
        // Current page: renders a span instead of a link
        <span
          className='text-accent me-1 text-sm font-medium md:me-2'
          aria-current='page'
        >
          {children}
        </span>
      ) : (
        // Not the current page: render an anchor
        <a
          href={href}
          className='text-accept hover:text-golden-red me-1 inline-flex items-center text-sm font-medium md:me-2'
        >
          {children}
        </a>
      )}

      {/* Show the chevron separator unless it's the current item */}
      {!current && <ChevronRight />}
    </li>
  );
}
