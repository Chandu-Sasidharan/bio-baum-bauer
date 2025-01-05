/**
 * Breadcrumb
 *
 * Renders a <nav> with a list (<ol>) of BreadcrumbItem children.
 */
export function Breadcrumb({
  children,
  label = 'Breadcrumb',
  className = '',
  ...props
}) {
  return (
    <nav className={`z-[2] flex ${className}`} aria-label={label} {...props}>
      <ol className='inline-flex items-center space-x-1 md:space-x-2'>
        {children}
      </ol>
    </nav>
  );
}
