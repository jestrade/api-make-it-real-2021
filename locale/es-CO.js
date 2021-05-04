const dictionaryESCO = {
  errors: {
    notAuthorized: "no autorizado",
    notAuthenticated: "no autenticado",
    invalidData: "datos no válidos",
    validate: {
      maxCharactersAllowed: "se excedió el máximo de caracteres",
      emptyData: "datos vacíos",
      invalidUsername: "nombre de usuario no válido",
      invalidName: "nombre inválido",
      invalidEmail: "email inválido",
      passwordsDontMatch: "las contraseñas no coinciden",
      invalidPassword: "contraseña invalida",
    },
    user: {
      userExists: "usuario actualmente existe",
      userNotExists: "usuario no existe",
      onCreate: "error al intentar crear el usuario",
      onDelete: "error al intentar eliminar el usuario",
    },
    tweet: {
      onDelete: "error al intentar eliminar el tweet",
    },
  },
  success: {
    user: {
      onCreate: "usuario creado exitosamente",
      onUpdate: "usuario actualizado correctamente",
      userDeleted: "usuario eliminado correctamente",
    },
    tweet: {
      onCreate: "tweet creado correctamente",
      onUpdate: "tweet actualizado correctamente",
      tweetDeleted: "tweet eliminado correctamente",
    },
  },
};

module.exports = { dictionaryESCO };
