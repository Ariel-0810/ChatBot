import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header>
        <title>Sushi Delight - Exquisite Japanese Cuisine</title>
        <meta
          name="description"
          content="Experience the finest sushi in town"
        />
      </header>

      <header className="bg-white shadow-md">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <img
              src="https://www.gourmet.cl/wp-content/uploads/2021/10/Sushi_Interior_Gourmet.jpg"
              alt="Sushi Delight Logo"
              width={50}
              height={50}
            />
            <span className="ml-3 text-xl font-semibold text-gray-800">
              Sushi Delight
            </span>
          </div>
          <Link
            to="/log-in"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Login
          </Link>
        </nav>
      </header>

      <main>
        <section className="container mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 lg:pr-24 md:pr-16">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Experimente el arte del sushi
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Deléitese con nuestro sushi meticulosamente elaborado, con los
                ingredientes más frescos y técnicas tradicionales.
              </p>
            </div>
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img
                src="https://media.istockphoto.com/id/1286622470/es/foto/rollo-de-sushi-fresco-saludable-con-jengibre-de-cerca-comida-japonesa.jpg?s=612x612&w=0&k=20&c=tcoQISATyEThBU0e3gr6VBdjfqprIyFPUuIb06qeNvc="
                alt="Sushi Platter"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="bg-gray-800 text-white py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-semibold text-center mb-8">
              Nuestras Especialidades
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <img
                  src="https://media.istockphoto.com/id/2163110806/es/foto/salm%C3%B3n-nigiri-sushi-en-plato-de-madera-con-palillos-comida-japonesa.jpg?s=612x612&w=0&k=20&c=Qpdhuc77VAvmIwbUbn1yf7SsfUkDqXQIkAtL6g8TlQ0="
                  alt="Nigiri"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Nigiri</h3>
                <p>
                  Sushi prensado a mano cubierto con los mejores cortes de
                  pescado.
                </p>
              </div>
              <div className="text-center">
                <img
                  src="https://media.istockphoto.com/id/1160560375/es/foto/rollitos-de-sushi-de-aguacate-de-salm%C3%B3n.jpg?s=612x612&w=0&k=20&c=dg_MREJMwyvciRFYSwx92Mdwg-7PeEzkYHqiQsJ9Tjw="
                  alt="Maki Rolls"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Maki Rolls</h3>
                <p>Sushi perfectamente enrollado con variedad de rellenos.</p>
              </div>
              <div className="text-center">
                <img
                  src="https://media.istockphoto.com/id/1324332485/es/foto/sashimi-mori.jpg?s=612x612&w=0&k=20&c=o0YSV_lENj294Marl80m5ie41EbL3H_7IO3iN-1yod4="
                  alt="Sashimi"
                  width={300}
                  height={200}
                  className="rounded-lg mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">Sashimi</h3>
                <p>
                  Pescado crudo fresco cortado en rodajas finas y servido con
                  precisión.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "¡El mejor sushi que he probado! El pescado es increíblemente
                fresco y la presentación es hermosa."
              </p>
              <p className="font-semibold">- Sarah L.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "Sushi Delight nunca decepciona. ¡Sus rolls especiales son
                innovadores y deliciosos!"
              </p>
              <p className="font-semibold">- Mike T.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 mb-4">
                "Me encanta el ambiente y el servicio atento. Es mi lugar de
                referencia para las noches de sushi."
              </p>
              <p className="font-semibold">- Emily R.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2023 Sushi Delight. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
