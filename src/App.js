import { useState } from "react";
import Creator from "./component/Creator";
import List from "./component/List";
import Search from "./component/Search";

function App() {

  const [stampsState, setStampsState] = useState([])

  return (
    <div className="layout">
    {/*Cabecera*/}
    <header className="header">
        <div className="logo">
          <img alt="tininvestments logo" className="logo-css" width="100px" height="100px" src="data:image/png;base64,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" />
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
      <List stampsState={stampsState} setStampsState={setStampsState}/>
    </section>

    {/*Barra lateral*/}
    <aside className="lateral">
       <Search stampsState={stampsState} setStampsState={setStampsState}/>
        <Creator setStampsState={setStampsState}/>
    </aside>

    {/*Pie de página*/}
    <footer className="footer">
        &copy; Investment professionals - <a href="https://evolve2digital.com">evolve2digital.com</a>
    </footer>

</div>
  );
}

export default App;
