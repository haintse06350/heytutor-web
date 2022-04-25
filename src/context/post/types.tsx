export default interface IPostCtx {
  isCreatingPost: boolean;
  createPost: () => void;
  discardCreatingPost: () => void;
}
