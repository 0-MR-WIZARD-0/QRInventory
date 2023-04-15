// import styles from "./registration.module.scss";

const Registration = () => {
  return (
    // className={styles.grid}
    <main>
      {/* <div > */}
    <div 
    // className={styles.register}
    >
    <h2>Sign Up</h2>

      <form action="" method="post" className="form">

        <div className="form__field">
          <input type="text" placeholder="FIO"/>
        </div>

        <div className="form__field">
          <input type="text" placeholder="username"/>
        </div>

        <div className="form__field">
          <input type="email" placeholder="info@mailaddress.com"/>
        </div>

        <div className="form__field">
          <input type="password" placeholder="••••••••••••"/>
        </div>

        <div className="form__field">
          <input type="password" placeholder="••••••••••••"/>
        </div>

        <div className="form__field">
          <input type="submit" value="Sign Up"/>
        </div>

      </form>
    {/* </div> */}
    </div>
   
    </main>
  )
}

export default Registration