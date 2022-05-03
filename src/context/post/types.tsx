export default interface IPostCtx {
  isCreatingPost: boolean;
  createPost: () => void;
  viewPost: (id: number) => void;
  discardCreatingPost: () => void;
}
