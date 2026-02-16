import { useActionState } from "react";
import { mockProducts } from "../../data/mockData";

async function submitSale(prevState, formData) {
  const product = formData.get("product");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  const existProduct = mockProducts.find((p) => p.name === product);

  if (!existProduct) {
    return {
      success: false,
      error: `Товар (${product}) не знайдено`,
    };
  }

  return { success: true, message: "Продаж додано!" };
}

export default function SalesForm() {
  const [state, formAction, isPending] = useActionState(submitSale, {
    success: null,
    message: "",
    error: "",
  });

  return (
    <div className="form-card">
      <h3 style={{ marginBottom: "1.5rem", color: "var(--text-primary)" }}>Новий продаж</h3>
      <form action={formAction} className="newitem-form">
        <div className="form-group">
          <input name="customer" placeholder="Ім'я клієнта" required />
        </div>

        <div className="form-group">
          <input name="product" placeholder="Назва товару" required />
        </div>

        <div className="form-group">
          <input name="amount" type="number" placeholder="Кількість" required min={1} />
        </div>

        <button className="submit-btn" disabled={isPending}>
          {isPending ? "Обробка..." : "Додати до бази"}
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