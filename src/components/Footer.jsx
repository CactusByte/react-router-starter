const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <>
      <footer className="text-center text-capitalize">
        copyright react router starter &copy; {year}
      </footer>
    </>
  );
};

export default Footer;
