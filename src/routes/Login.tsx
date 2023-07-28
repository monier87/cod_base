import React, { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import "./login.css"; // Import the CSS file
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faArchive, faFolder } from "@fortawesome/free-solid-svg-icons";
import companyLogo from '../../public/LOGO.jpg'

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Set the user as authenticated without checking the password
    try {
      const response = await fetch("http://localhost:3001/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;
        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="form">
        <div className="company-logo">
          <img src={companyLogo} alt="LOGO" />
        </div>
        <h1 className="titulo-verde">Sistema de Gestión Archivística</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Usuario</label>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          value={username}
        />
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={password}
        />
        <button className="btn-entrar">Entrar</button>
        <div className="document-management-icons">
          <FontAwesomeIcon icon={faFileAlt} />
          <FontAwesomeIcon icon={faArchive} />
          <FontAwesomeIcon icon={faFolder} />
        </div>
      </form>
    </DefaultLayout>
  );
}