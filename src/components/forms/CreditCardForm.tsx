
import React, { useState } from "react";

const CreditCardForm = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  // Manejador de cambios en los campos del formulario
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validación del formulario
  const validateForm = () => {
    let valid = true;
    let newErrors = { ...errors };

    // Validar número de tarjeta
    if (!formData.cardNumber || formData.cardNumber.length !== 16) {
      newErrors.cardNumber = "Introduce un número de tarjeta válido (16 dígitos)";
      valid = false;
    } else {
      newErrors.cardNumber = "";
    }

    // Validar fecha de caducidad
    if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Introduce una fecha válida (MM/AA)";
      valid = false;
    } else {
      newErrors.expiryDate = "";
    }

    // Validar CVV
    if (!formData.cvv || formData.cvv.length !== 3) {
      newErrors.cvv = "El CVV debe tener 3 dígitos";
      valid = false;
    } else {
      newErrors.cvv = "";
    }

    setErrors(newErrors);
    return valid;
  };

  // Manejador del envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Formulario válido, enviando datos:", formData);

      // Reseteamos el formulario
      setFormData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
      });
    }
  };

  return (
    <div className=" mx-2 p-5 bg-white rounded shadow-sm">
      <h2>Datos de la Tarjeta de Crédito</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-5">
        {/* Número de Tarjeta */}
        <div className="h-20 p-2 col-span-3">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.cardNumber ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder=""
              maxLength={16}
            />
            <label
              htmlFor="cardNumber"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              Número de Tarjeta
            </label>
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-center">{errors.cardNumber}</p>
          )}
        </div>

        {/* Fecha de Caducidad */}
        <div className="h-20 p-2">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.expiryDate ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              placeholder=""
              maxLength={5}
            />
            <label
              htmlFor="expiryDate"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              Fecha de Caducidad (MM/AA)
            </label>
          </div>
          {errors.expiryDate && (
            <p className="text-red-500 text-center">{errors.expiryDate}</p>
          )}
        </div>

        {/* CVV */}
        <div className="h-20 p-2">
          <div className="flex items-baseline relative">
            <input
              className={`mb-2 p-2 w-full border-b-2 focus:border-primary ${
                errors.cvv ? "border-red-400" : "border-gray-300"
              } bg-transparent focus:outline-none text-base peer`}
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder=""
              maxLength={3}
            />
            <label
              htmlFor="cvv"
              className="absolute left-2 top-2 text-gray-500 text-sm transition-all duration-200 ease-in-out peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-primary"
            >
              CVV
            </label>
          </div>
          {errors.cvv && (
            <p className="text-red-500 text-center">{errors.cvv}</p>
          )}
        </div>

        <button
          className="p-5 md:p-2 w-full mt-5 lg:p-4 text-xs text-white bg-gradient-to-r from-accent1 to-accent2 font-bold rounded hover:bg-gradient-to-l hover:scale-105 transition-transform"
          type="submit"
        >
          Confirmar Pago
        </button>
      </form>
    </div>
  );
};

export default CreditCardForm;
