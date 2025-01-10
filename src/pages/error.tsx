import { AxiosError } from "axios";
import { isRouteErrorResponse, useRouteError } from "react-router";

export default function ErrorPage() {
  const error = useRouteError();

  let errorMessage = "";
  let errorStatus;
  if (isRouteErrorResponse(error)) {
    errorMessage = error.data.statusText;
  } else if (error instanceof AxiosError) {
    errorStatus = error.status;
    errorMessage = error.response?.data.message || error.message;
  }

  return (
    <div id="error-page">
      <h1>Error {errorStatus}</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{errorMessage}</i>
      </p>
    </div>
  );
}
