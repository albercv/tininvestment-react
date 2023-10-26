import { useState } from "react";
import Creator from "./component/Creator";
import List from "./component/List";
import Search from "./component/Search";
import logo from "./assets/images/logo_v2.png";

function App() {

  const [picturesState, setPicturesState] = useState([])

  return (
    <div className="layout">
    {/*Cabecera*/}
    <header className="header">
        <div className="logo">
          <img alt="tininvestments logo" className="logo-css" width="100px" height="100px" src={logo} />
        </div>
        
        <h1>Tininvestments</h1>
    </header>

    {/*Barra de navegación*/}
    <nav className="nav">
        <ul>
            <li><a href="/#">Inicio</a></li>
            <li><a href="/#">Blog</a></li>
            <li><a href="/#">Contacto</a></li>
        </ul>
    </nav>

    {/*Contenido principal*/}
    <section id="content" className="content">
      <List picturesState={picturesState} setPicturesState={setPicturesState}/>
    </section>

    {/*Barra lateral*/}
    <aside className="lateral">
       <Search picturesState={picturesState} setPicturesState={setPicturesState}/>
        <Creator draftPictureState={null} setPicturesState={setPicturesState}/>
    </aside>

    {/*Pie de página*/}
    <footer className="footer">
        &copy; Investment professionals - <a href="https://evolve2digital.com">evolve2digital.com</a>
    </footer>

</div>
  );
}

export default App;
