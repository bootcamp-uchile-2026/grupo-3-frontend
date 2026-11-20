import type { FormEvent } from "react";
import { IconTicket } from "../UIKit/UIIcons";

interface CouponBoxProps {
  value: string;
  isLoading: boolean;
  error: string | null;
  onChange: (value: string) => void;
  onApply: (event: FormEvent<HTMLFormElement>) => void;
}

export function CouponBox({
  value,
  isLoading,
  error,
  onChange,
  onApply,
}: CouponBoxProps) {
  return (
    <section className="coupon-box" aria-labelledby="coupon-box-title">
      <h2 className="coupon-box__title" id="coupon-box-title">Cupón</h2>
      <form className="coupon-box__form" onSubmit={onApply}>
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
            placeholder="Introduce el código promocional"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? "coupon-box-error" : undefined}
          />
          <button className="coupon-box__submit" type="submit" disabled={isLoading}>
            {isLoading ? "Cargando..." : "Aplicar"}
          </button>
        </label>
        {error && <p className="coupon-box__error" id="coupon-box-error" role="alert">{error}</p>}
      </form>
    </section>
  );
}
