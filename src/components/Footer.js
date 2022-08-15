export default function Footer() {
  const yearDate = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {yearDate} Gleb Bychkov</p>
    </footer>
  );
}