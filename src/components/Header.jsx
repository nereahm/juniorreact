import React, { useState } from "react";
import Footer from "./Footer";
import { RiMenu2Fill, RiCloseFill } from "react-icons/ri";

function Header() {
  const [abrirMenu, setabrirMenu] = useState(false);
  const [mostrarImagen, setMostrarImagen] = useState(false);

  const toggleMenu = () => {
    setabrirMenu(!abrirMenu);
    setMostrarImagen(false);
  };

  const toggleImagen = () => {
    setMostrarImagen(!mostrarImagen);
  };

  return (
    <div className="cabecera">
      <div className={`header ${abrirMenu ? "active" : ""}`}>
        <div className={`header__logo ${abrirMenu ? "active" : ""}`}>mater</div>
        <button
          type="button"
          className={`header__boton ${abrirMenu ? "active" : ""}`}
          onClick={toggleMenu}
        >
          {abrirMenu ? <RiCloseFill /> : <RiMenu2Fill />} 
        </button>
        <nav className={`header__nav ${abrirMenu ? "active" : ""}`}>
<ul className="listaNav">
    <li className={`elementoLista ${abrirMenu ? "active" : ""}`}>
      Collection
      <ul className={`elementoLista__hover ${abrirMenu ? "active" : ""}`}>
        <li className="elementoLista__hoverItem" onClick={toggleImagen}>
          Furniture
        </li>
        <li className="elementoLista__hoverItem">Lighting</li>
        <li className="elementoLista__hoverItem">Accessories</li>
      </ul>
    </li>
    <li className={`elementoLista ${abrirMenu ? "active" : ""}`}>Design</li>
    <li className={`elementoLista ${abrirMenu ? "active" : ""}`}>Craftsmanship</li>
    <li className={`elementoLista ${abrirMenu ? "active" : ""}`}>Ethic</li>
  </ul>
  {abrirMenu && <Footer/>}
        </nav>
      </div>
      <div className={`hoverItem ${mostrarImagen ? 'aparece' : ''}`}>
        <img
          src="/sofa_blanco.png"
          alt="Furniture"
          className={`hoverItem__img ${mostrarImagen ? 'aparece' : ''}`}
        />
      </div>
    </div>
  );
}

export default Header;
