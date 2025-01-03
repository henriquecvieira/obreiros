import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li style={styles.navItem}><Link to="/" style={styles.navLink}>Home</Link></li>
        <li style={styles.navItem}><Link to="/user-registration" style={styles.navLink}>Cadastro de Obreiro</Link></li>
        <li style={styles.navItem}><Link to="/function-assignment" style={styles.navLink}>Atribuição de Funções</Link></li>
        <li style={styles.navItem}><Link to="/PDF-Generator" style={styles.navLink}>Gerador de Escala PDF por Datas</Link></li>
      </ul>
    </nav>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#007bff",
    padding: "10px 0",
    boxShadow: "0 4px 6px rgba(0, 180, 255 , 0.4)",
    zIndex: 1000,
  },
  navList: {
    listStyle: "none",
    display: "flex",
    justifyContent: "center",
    margin: 0,
    padding: 0,
  },
  navItem: {
    margin: "0 20px",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
};

export default Navbar;

