export function joiValidation(todoRef, errorRef) {
  const schema = {
    // name: Joi.string().min(3).max(10),
    todo: Joi.string().trim().alphanum().min(3).max(50).required(),
  };

  const userInput = {};

  todoRef.addEventListener("input", (e) => {
    userInput[e.target.name] = e.target.value;
    console.log(userInput);

    //remove old errors
    const errorRefs = document.getElementById("error");
    errorRefs.innerHTML = "";

    Joi.validate(
      userInput,
      schema,
      { abortEarly: false },
      (errors, results) => {
        console.log(errors.details);

        const errorsMod = {};

        errors.details.forEach((error) => {
          errorsMod[error.context.key] = error.message;
        });

        errorRefs.innerHTML = Object.values(errorsMod).join("<br>");
      }
    );
  });
}
