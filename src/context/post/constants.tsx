export const INITIAL_STATE = {
  isCreatingPost: false,
  createPost: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  discardCreatingPost: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
};
