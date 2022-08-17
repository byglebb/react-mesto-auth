export default function Login(props) {
  const loginSubmitButtonClassName = !props.isValid ? "login__submit-button login__submit-button_disabled" : "login__submit-button"
  return (
    <main className="content">
      <section className="login">
        <h2 className="login__title">{props.title}</h2>
        <form
          className={`login__form`}
          onSubmit={props.onSubmit}
          noValidate>
          <input
            type="email"
            // value={email || ""}
            className="login__input"
            name="email"
            id="email"
            placeholder="Email"
            required />
          <span className="login__input-error"></span>
          <input
            type="password"
            // value={password || ""}
            className="login__input"
            name="password"
            id="password"
            minLength="8"
            placeholder="Пароль"
            required />
          <span className="login__input-error"></span>
          <button
            className="login__submit-button"
            type="submit"
            disabled={!props.isValid}>{props.submitButton}
          </button>
        </form>
      </section>
    </main>
  );
}