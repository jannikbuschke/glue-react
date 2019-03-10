import produce from "immer";

interface BadRequestResponse {
  [field: string]: string[];
}

function camelize(str: string) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ""; // or if (/\s+/.test(match)) for white spaces
    return index == 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export const badRequestResponseToFormikErrors = (data: BadRequestResponse) => {
  const errors = {};
  Object.keys(data).forEach(key => {
    errors[camelize(key)] = data[key];
  });
  return errors;
};

export const validate = async (
  url: string,
  request: any,
  additionalHeaders?: HeadersInit
): Promise<any> => {
  const headers = produce(additionalHeaders || {}, draft => {
    draft["content-type"] = "application/json";
  });
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(request),
    headers
  });

  switch (response.status) {
    case 400: {
      const data: BadRequestResponse = await response.json();
      const errors = badRequestResponseToFormikErrors(data);

      console.log("errors", errors);
      if (Object.keys(errors).length) {
        // throw errors;
        return errors;
      }
    }
    case 200: {
      return {};
    }
    case 404: {
      console.error(
        `could not find validation handler '${url}'. Did you forget to provide a server side validation handler?`
      );
    }
    default: {
      console.error("Could not validate request", response);
    }
  }
};

export const createValidationHandler = (url: string) => async (values: any) =>
  validate(values, url);
