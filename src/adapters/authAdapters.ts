import { backendURL } from "../util/globalVars";
import { IStudent, IUserCreation } from "../util/types";

export async function loginUser(email: string, password: string) {
  const response = await fetch(`${backendURL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  return response;
}

export async function getUser(email: string): Promise<IStudent | null> {
  try {
    const res = await fetch(`${backendURL}/auth/user/?email=${email}`);

    if (!res.ok) return null;

    return res.json() as Promise<IStudent | null>;
  } catch (error) {
    return null;
  }
}

export async function registerUser(user: IUserCreation) {
  try {
    const res = await fetch(`${backendURL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    return res.ok;
  } catch (error) {
    return 404;
  }
}

export async function checkIfEmailIsCreated(email: string) {
  try {
    const res = await fetch(
      `${backendURL}/auth/check-if-email-created/?email=${email}`
    );

    return res.json();
  } catch (error) {
    return 404;
  }
}
