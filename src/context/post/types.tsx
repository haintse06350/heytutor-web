export default interface IPostCtx {
  isCreatingPost: boolean;
  createPost: () => Promise<void>;
  discardCreatingPost: () => Promise<void>;
}
