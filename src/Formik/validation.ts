interface BadRequestResponse {
  [field: string]: string[];
}

function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const validate = async (url: string, request: any): Promise<any> => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers: { "content-type": "application/json" }
  });

  if (response.status === 400) {
    const data: BadRequestResponse = await response.json();
    const errors = {};
    Object.keys(data).forEach(key => {
      errors[camelize(key)] = data[key];
    });

    console.log("errors", errors);
    if (Object.keys(errors).length) {
      throw errors;
    }
  }
  console.log("return empty");
  return {};
};

// export const validateDebounced = debounce(_validate, 500, { leading: false });

// export const validate = async (url: string, request: any) => {
//   console.log("validate...");
//   const result = await validateDebounced(url, request);
//   console.log("validated", result);
//   if (Object.keys(result).length > 0) {
//     console.log("throw");
//     throw result;
//   }
// };

export const createValidationHandler = (url: string) => async (values: any) =>
  validate(values, url);
