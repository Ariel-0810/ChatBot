import { Routes } from '../../../../routes/index'
import { LogInSchema } from '../../schemas/auth.schema'
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import useLogIn from '../../hooks/useLogIn'
import { toast } from 'sonner'

export default function LogInForm() {
    const { logIn, loading, error } = useLogIn()
    const navigate = useNavigate()
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: LogInSchema,
      onSubmit: async ({ email, password }) => {
        const result = await logIn({
          email,
          password,
        })
        console.log('Backend response:', result);  // Verifica la respuesta
        
        if (result) {
            console.log('Login exitoso, redirigiendo a /chat...');
            navigate(Routes.chat);
          } else {
            console.error('Error en el login', result.error);
            toast.error(result.error || 'Error desconocido');
          }
        },
      });

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>
          <form onSubmit={formik.handleSubmit} className="space-y-6">

                {/* Input Email */}
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <span>Email</span>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="email"
                placeholder="email@gmail.com"
                type="email"
                required
              />
                {formik.touched.email && <span className="border-primary text-primary">{formik.errors.email}</span>}
                </label>

            {/* Input Email */}

            {/* Input Password */} 
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <span>Password</span>
              <input
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                onChange={formik.handleChange}
                value={formik.values.password}
                onBlur={formik.handleBlur}
                name="password"
                placeholder="****************"
                type="password"
                required
              />
            {formik.touched.password && <span className="border-primary text-primary">{formik.errors.password}</span>}
            </label>
            {/* Input Password */}

            <div className="flex gap-1">
          <p>¿No tienes una cuenta?</p>
          <Link className="underline" to={Routes.signUp}>
            Crear cuenta
          </Link>
        </div>

            {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                type="submit"
                disabled={loading} // Usa `disabled` para deshabilitar el botón durante la carga
              >
                {loading ? "Signing in..." : "Sign in"} {/* Cambia el texto según el estado */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}