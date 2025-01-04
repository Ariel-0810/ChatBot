import * as yup from "yup";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#.*%&@\$%\^&\*])(?=.{8,})/;
const usernameSignUp = /^(\S+$)/g;
const emailRules = /^[^@]+@[^@]+\.[^@]+$/;

export const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "El nombre de usuario debe tener al menos 5 caracteres.")
    .max(25, "El nombre de usuario debe contener un máximo de 25 caracteres")
    .required("Obligatorio, por favor ingrese su nombre de usuario")
    .matches(usernameSignUp, "espacios no permitidos"),
  email: yup
    .string()
    .max(255)
    .email("Debe ser un correo electrónico válido")
    .required("El email es requerido")
    .matches(emailRules, "Debe ser un email"),
  password: yup
    .string()
    .required("Por favor ingrese su contraseña")
    .matches(
      passwordRules,
      "Debe contener 8 caracteres: uno en mayúscula, uno en minúscula, un número y un carácter especial: ! @ # . * % &"
    )
});

export const LogInSchema = yup.object().shape({
  email: yup
    .string()
    .max(255)
    .email("Debe ser un correo electrónico válido")
    .required("El email es requerido")
    .matches(emailRules, "Debe ser un email"),
  password: yup
    .string()
    .required("Requerido, por favor ingrese la contraseña")
    .matches(
      passwordRules,
      "Debe contener 8 caracteres, una mayúscula, una minúscula, un numero y un carácter especial: : ! @ # . * % &"
    )
});
