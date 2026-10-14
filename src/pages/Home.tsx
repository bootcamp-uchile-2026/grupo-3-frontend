
import { CardCategoria } from '../components/CardCategoria'
import { CardProducto } from '../components/CardProducto'
import { Hero } from '../components/Hero'
import { Link } from 'react-router-dom'

export function Home() {
  const categorias = [
    {
      titulo: 'Categoría 1',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 2',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 3',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 4',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 5',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 6',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
    {
      titulo: 'Categoría 7',
      urlImagen: 'https://placehold.co/250x250',
      urlLink: '/categoria/categoria-productos.html',
    },
  ]

  const ofertas = [
    {
      idProducto: 101,
      titulo: 'Producto 1',
      urlImagen: 'https://placehold.co/400x400',
      precio: 50,
      categoria: 'Categoría 1',
    },
    {
      idProducto: 102,
      titulo: 'Producto 2',
      urlImagen: 'https://placehold.co/400x400',
      precio: 75,
      categoria: 'Categoría 2',
    },
    {
      idProducto: 103,
      titulo: 'Producto 3',
      urlImagen: 'https://placehold.co/400x400',
      precio: 100,
      categoria: 'Categoría 3',
    },
    {
      idProducto: 104,
      titulo: 'Producto 4',
      urlImagen: 'https://placehold.co/400x400',
      precio: 125,
      categoria: 'Categoría 4',
    },
  ]

  return (
    <>
      <Hero
        imageSrc="https://placehold.co/1920x600"
        title="Cómprale lo mejor en un solo lugar"
        buttons={[
          { text: 'Ver productos', to: '/tienda' },
          { text: 'Nuestra clínica', to: '/clinica' },
        ]}
      />

      <section>
        <div className="container categorias-home">
          {categorias.map((categoria, index) => (
            <CardCategoria
              key={index}
              {...categoria}
            />
          ))}
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="titulo-seccion">Ofertas</h2>

          <div className="productos-ofertas">
            {ofertas.map((producto) => (
              <CardProducto
                key={producto.idProducto}
                {...producto}
              />
            ))}
          </div>

          <div className="ver-mas">
            <Link to="/tienda">
              Mostrar más productos
            </Link>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <h2 className="titulo-seccion">
            Perfil personalizado de la mascota
          </h2>
        </div>

        <div className="banner">
          <img
            src="https://placehold.co/1920x800"
            alt="Banner de perfil de mascota"
          />

          <div className="banner-content">
            <Link to="/mi-perfil/perfil-mascota">
              Registrar tu mascota
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
