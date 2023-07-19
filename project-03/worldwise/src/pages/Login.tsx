import { useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import Button from "../components/Button/Button";
const Login = (): JSX.Element => {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPW, setInputPW] = useState("");
  return (
    <main className={styles["login"]}>
      <PageNav />
      <form
        autoComplete='off'
        className={styles["form"]}
        onSubmit={(e) => {
          e.preventDefault();
          console.log(inputEmail);
          console.log(inputPW);
        }}>
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
            type='text'
            value={inputPW}
            onChange={(e) => setInputPW(e.target.value)}
          />
        </div>
        <div>
          <Button type={"primary"}>Log in</Button>
        </div>
      </form>
    </main>
  );
};

export default Login;
