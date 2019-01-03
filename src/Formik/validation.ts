interface IValidationResult {
  memberNames: string[];
  errorMessage: string;
}

export const createValidationHandler = (url: string) => async (values: any) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "content-type": "application/json" }
  });
  if (!response.ok) {
    console.error(response);
    throw new Error("someting bad happened");
  }
  const data: IValidationResult[] = await response.json();
  const errors = {};
  data.forEach(element => {
    errors[element.memberNames[0].toLowerCase()] = element.errorMessage;
  });
  if (Object.keys(errors).length) {
    throw errors;
  }
};
