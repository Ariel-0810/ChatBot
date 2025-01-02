import { Routes } from '../../../../routes'
import { SignUpSchema } from '../../schemas/auth.schema' 
import { useFormik } from 'formik'
import { Link, useNavigate } from 'react-router-dom'
import useSignUp from '../../hooks/useSignUp'
import { toast } from 'sonner'


export default function SignUpForm() {
  const { signUp, loading } = useSignUp()
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: async ({ email, password, username }) => {
      const result = await signUp({
        email,
        password,
        username,
      })

      if (result.success) navigate(Routes.logIn)

      if (result.error) toast.error(result.error)
    },
  })

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-semibold text-center mb-6">Crear Cuenta</h1>
          <form onSubmit={formik.handleSubmit} className="space-y-6" role="form" data-testid="sign-up-form">

              <label className="flex flex-col gap-1">
                <span>Nombre de usuario</span>
                <input
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  onBlur={formik.handleBlur}
                  name="username"
                  placeholder="my_username02"
                  type="text"
                  required
                />
                {formik.touched.username && <span className="border-primary text-primary">{formik.errors.username}</span>}
              </label>

              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              <span>Correo</span>
              <input
                id="email"
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

              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              <span>Contraseña</span>
              <input
                id="password"
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

        <div className="flex gap-1">
          <p>Ya tienes una cuenta?</p>
          <Link className="underline" to={Routes.logIn}>
            Ingresar
          </Link>
        </div>
            
            <div>
              <button
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                type="submit"
                disabled={loading}
              >
                {loading ? "Registrando..." : "Registrarse"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
