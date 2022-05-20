export const PATTERNS = {
  EMAIL: {
    exp: ".*^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.([a-zA-Z]{2,4})+$.*",
    title: "Ingresar un correo válido",
  },
  NUMBER: {
    exp: ".*^(?:+|-)?d+$.*",
    title: "Ingresa solo números",
  },
  URL: {
    exp: ".*((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*).*",
    title: "Ingresar una URL válida",
  },
};
