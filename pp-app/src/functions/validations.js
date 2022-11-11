import { isEmail } from "validator";

const required = (value) => {
    if (!value) {
      return (
        <div className="alert redText alert-danger text-base my-2 mx-1" role="alert">
          ¡Este campo es obligatorio!
        </div>
      );
    }
  };
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert redText alert-danger text-base my-2 mx-0" role="alert">
        Mail no válido.
        </div>
      );
    }
  };
  const vstrings = (value) => {
    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if(!regName.test(value)){
       <div className="alert redText alert-danger text-base my-2 mx-1" role="alert">
          Debe ser solamente texto, no puede contener otro tipo de caracteres.
        </div>
    }else{
      alert('Valid name given.');
    }
  };
  const vpassword = (value) => {
    if (value.length < 6 || value.length > 20) {
      return (
        <div className="alert redText alert-danger text-sm my-2 mx-1 " role="alert">
          La contraseña tiene que tener al menos 10 caracteres y como máximo 20.
        </div>
      );
    }
  };

  const vcancel = (value) => {
    if (value != "Cancelar") {
      return (
        <div className="alert redText alert-danger text-sm my-2 mx-3" role="alert">
          La palabra ingresada es incorrecta.
        </div>
      );
      }
  }
  
const ValidationFunctions = {
    required,
    validEmail,
    vpassword,
    vstrings,
    vcancel,
}
export default ValidationFunctions;