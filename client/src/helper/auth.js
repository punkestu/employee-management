export function authenticate(username, password) {
  return fetch(
    `${import.meta.env.PROD ? "/" : "http://localhost:3000/"}api/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }
  ).then(async (res) => {
    const body = await res.json();
    return {
      status: res.status,
      body,
    };
  });
}

export function isAuth() {
  if (localStorage.getItem("auth")) {
    return localStorage.getItem("auth");
  } else {
    return false;
  }
}

export function signout() {
  localStorage.removeItem("auth");
}
