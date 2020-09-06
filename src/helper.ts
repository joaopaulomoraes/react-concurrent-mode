export interface Resource {
  load(): any;
}

export function wrapPromise(promise: Promise<any>): Resource {
  let status = "pending";
  let result: any;

  let suspender = promise.then(
    (r: any) => {
      status = "success";
      result = r;
    },
    (e: Error) => {
      status = "error";
      result = e;
    }
  );

  return {
    load() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}
