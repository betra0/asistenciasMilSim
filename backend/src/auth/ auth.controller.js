import { authenticate } from "./auth.service.js";

export async function login(req, res) {
  const { username, password } = req.body;

  const ok = await authenticate(username, password);

  if (!ok) return res.status(401).json({ error: "invalid credentials", example: { username: "pepito", password: "123" } });

  const token = ok.token;

  res.cookie("auth_token", token, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60 * 1000
  });

  res.json({ ok: true, user: { id: ok.id, username: ok.username } });
}

export function logout(req, res) {
  res.clearCookie("auth_token");
  res.json({ ok: true });
}

export function me(req, res) {
    // provisional, la idea es consultar en bd
    const user = { id: req.user.sub, username: "admin" };
    res.json(user);
}