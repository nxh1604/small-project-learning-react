import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button/Button";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = (): JSX.Element => {
  const [inputEmail, setInputEmail] = useState("jack@example.com");
  const [inputPW, setInputPW] = useState("qwerty");

  const { login, isAuthenicate } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenicate) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenicate, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputEmail && !inputPW) return;
    login(inputEmail, inputPW);
  };

  return (
    <main className={styles["login"]}>
      <PageNav />
      <form autoComplete='off' className={styles["form"]} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor='email'>Email</label>
          <input
            placeholder='Email...'
            id='email'
            type='email'
            value={inputEmail}
            onChange={(e) => setInputEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            placeholder='Password...'
            id='password'
            type='password'
            value={inputPW}
            onChange={(e) => setInputPW(e.target.value)}
          />
        </div>
        <div>
          <Button buttonType='submit' type={"primary"}>
            Log in
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
