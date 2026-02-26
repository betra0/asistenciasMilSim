

function required(name, value) {
  if (!value) {
    throw new Error(`Missing env variable: ${name}`);
  }
  return value;
}

export const config = {
  apiUrl: required("VITE_API_URL", import.meta.env.VITE_API_URL),
  mode: import.meta.env.MODE,
  isDev: import.meta.env.DEV,
};