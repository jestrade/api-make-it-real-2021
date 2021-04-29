const dictionaryESCO = {
  errors: {
    notAuthorized: "no autorizado",
    notAuthenticated: "no autenticado",
    invalidData: "datos no válidos",
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
      userDeleted: "usuario eliminado correctamente",
    },
    tweet: {
      tweetDeleted: "tweet eliminado correctamente",
    },
  },
};

module.exports = { dictionaryESCO };
