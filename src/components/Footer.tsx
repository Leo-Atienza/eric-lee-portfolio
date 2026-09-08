/* Ft2, one line under a hairline. */
const Footer = () => (
  <footer className="page pb-12">
    <hr className="rule" />
    <div className="small muted flex flex-wrap items-center justify-between gap-x-8 gap-y-2 pt-6">
      <p>
        Eric Lee, Markham, Ontario. <span className="num">&copy; {new Date().getFullYear()}</span>
      </p>
      <a href="#top" className="quiet-link inline-flex min-h-[44px] items-center">
        Back to top <span aria-hidden="true">&nbsp;&uarr;</span>
      </a>
    </div>
  </footer>
);

export default Footer;
