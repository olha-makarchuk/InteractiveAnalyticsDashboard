import { useActionState, useContext, useEffect } from "react";
import { LoadingContext } from "../../contexts/LoadingContext";

async function svalidateEmail(prevState, formData) {
  const email = formData.get("email");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (email.toLowerCase().includes("fail")) {
    return {
      success: false,
      error: `Валідація не усіпшна`,
    };
  }

  return { success: true, message: "Користувача додано!" };
}

export default function UserForm() {
  const [state, formAction, isPending] = useActionState(svalidateEmail, {
    success: null,
    message: "",
    error: "",
  });

  const { startLoading, stopLoading } = useContext(LoadingContext);

  useEffect(() => {
    if (isPending) {
      startLoading();
    } else {
      const timer = setTimeout(stopLoading, 300);
      return () => clearTimeout(timer);
    }
  }, [isPending, startLoading, stopLoading]);

  return (
    <div className="form-card">
      <h3 style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>
        Додати користувача:
      </h3>
      <form action={formAction} className="newitem-form">
        <div className="form-group">
          <input name="name" placeholder="Ім'я: " required />
        </div>

        <div className="form-group">
          <input name="email" placeholder="Email: " type="email" required />
        </div>

        <fieldset>
          <legend>Роль:</legend>

          <div>
            <input
              type="radio"
              id="admin"
              name="role"
              value="admin"
              defaultChecked
            />
            <label htmlFor="admin">Адмін</label>
          </div>

          <div>
            <input type="radio" id="user" name="role" value="user" />
            <label htmlFor="user">Користувач</label>
          </div>
        </fieldset>

        <button className="submit-btn" disabled={isPending}>
          Зберегти
        </button>

        {state.success && (
          <div className="form-feedback feedback-success">{state.message}</div>
        )}
        {state.error && (
          <div className="form-feedback feedback-error">{state.error}</div>
        )}
      </form>
    </div>
  );
}
