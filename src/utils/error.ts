export class ErrorUtils {
  static throwError = async (response: any) => {
    if (response.status >= 300) {
      const e = await response.json();
      if (e.errors) {
        if (e.errors[0]?.field === "Bearer Token") {
          window.location.href = "/login";
        }
        throw e.message || e.errors[0].message;
      } else if (e.stack) {
        throw e.message;
      }
    }
  };
}
