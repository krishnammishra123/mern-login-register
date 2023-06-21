   
 

//Login Validation
  export const adminValidate = (email,password) => {
      let errors = {};
      if (!email?.trim()) {
        errors.email = "*Email is required";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.email = "*You have entered an invalid email address!";
      }

      if (!password?.trim()) {
        errors.password = "*Password is required";
      }
      return errors;
  };
    
//password reset validation
  export  const PasswordResetValidate = (email) => {
         let errors = {};
         if (!email?.trim()) {
           errors.email = "*Email is required";
         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
           errors.email = "*You have entered an invalid email address!";
         }
         return errors;
  };
    
//ForgotPassword reset validation

export const ForgotPasswordValidate = (password) => {
      let errors = {};
      if (!password?.trim()) {
        errors.password = "*Password is required";
      }
      return  errors;
}


  export const UploadValidate = (name, file) => {
    let errors = {};
     if (!name?.trim()) {
       errors.name = "*Name is required";
     }
    if (file?.length === 0 ) {
      errors.file = "*File is required";
    }
    return errors;
  };