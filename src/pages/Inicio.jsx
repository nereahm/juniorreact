import React, { useEffect, useState } from "react";

function Inicio() {
  const [productos, setProductos] = useState([]);
  const [productoActual, setProductoActual] = useState(0);
  const VITE_API = import.meta.env.VITE_API;

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const controller = new AbortController();
        const options = {
          method: 'GET',
          headers: {
            "Content-Type": "application/json"
          },
          signal: controller.signal
        };
        const response = await fetch(VITE_API, options);
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error("Error buscando productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  useEffect(() => {
    const handleWheel = (event) => {
      const delta = Math.sign(event.deltaY);
      setProductoActual((prevProductoActual) => {
        const newIndex = Math.max(
          0,
          Math.min(productos.length - 1, prevProductoActual + delta)
        );
        return newIndex;
      });
    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [productos]);

  const mostrarProducto = (indiceProducto) => {
    setProductoActual(indiceProducto);
  };

  return (
    <div className="inicioProductos">
      <div className="productos">
        <ul className="productosLista">
          {productos.map((producto, index) => (
            <li
              key={producto._id}
              className={`productosLista__elemento ${
                index === productoActual ? "current" : ""
              }`}
              style={{
                transition: "transform 1.5s ease",
                transform:
                  index === productoActual
                    ? "translateY(0)"
                    : "translateY(100vh)",
              }}
            >
              {index === productoActual && (
                <>
                  <div className="productoDetalle">
                    <div className="textoProducto">
                      <p className="elementoPersona">{producto.persona}</p>
                      <h2 className="elementoNombre">{producto.nombre}</h2>
                      <p className="elementoDescripcion">
                        {producto.descripcion}
                      </p>
                      <button type="button" className="productosBoton">
                        Products Details
                      </button>
                    </div>
                    <div className="imagenProducto">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="imagenProducto__img"
                      />
                    </div>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="bloquesCambios">
        {productos.map((producto, index) => (
          <div
            key={index}
            onClick={() => mostrarProducto(index)}
            className={`bloque ${
              index === productoActual ? "seleccionado" : ""
            }`}
          >
            <div
              className={`numeroBloque ${
                index === productoActual ? "seleccionado" : ""
              }`}
            >
              <div
                className={`lineaArriba ${
                  index === productoActual ? "activa" : ""
                }`}
              ></div>
              <p
                className={`numero ${
                  index === productoActual ? "numeroActivo" : ""
                }`}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </p>
            </div>
            <p
              className={`nombre ${
                index === productoActual ? "nombreActivo" : ""
              }`}
            >
              {producto.nombre}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inicio;
