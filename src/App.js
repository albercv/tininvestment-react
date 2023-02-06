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
            <div className="play"></div>
        </div>
        
        <h1>Tininvestments</h1>
    </header>

    {/*Barra de navegación*/}
    <nav className="nav">
        <ul>
            <li><a href="/#">Inicio</a></li>
            <li><a href="/#">Sellos</a></li>
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
