import type { FormEvent } from "react";
import { IconTicket } from "../UIKit/UIIcons";

type CouponBoxProps = {
  value: string;
  isLoading: boolean;
  error: string | null;
  onChange: (value: string) => void;
  title?: string;
} & (
  | { onApply: (event: FormEvent<HTMLFormElement>) => void; formId?: never }
  | { formId: string; onApply?: never }
);

export function CouponBox({
  value,
  isLoading,
  error,
  onChange,
  onApply,
  formId,
  title = "Cupón",
}: CouponBoxProps) {
  const fields = (
    <>
      <label className="coupon-box__field">
        <IconTicket
          className="coupon-box__icon"
          color="var(--b-n-90-color)"
          aria-hidden="true"
        />
        <span className="coupon-box__visually-hidden">Código promocional</span>
        <input
          className="coupon-box__input"
          type="text"
          name="codigo-cupon"
          form={formId}
          placeholder="Introduce el código promocional"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "coupon-box-error" : undefined}
        />
        <button className="coupon-box__submit" type="submit" form={formId} disabled={isLoading}>
          {isLoading ? "Cargando..." : "Aplicar"}
        </button>
      </label>
      {error && <p className="coupon-box__error" id="coupon-box-error" role="alert">{error}</p>}
    </>
  );

  return (
    <section className="coupon-box" aria-labelledby="coupon-box-title">
      <h2 className="coupon-box__title" id="coupon-box-title">{title}</h2>
      {formId ? (
        <div className="coupon-box__form">{fields}</div>
      ) : (
        <form className="coupon-box__form" onSubmit={onApply}>{fields}</form>
      )}
    </section>
  );
}
