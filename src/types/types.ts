export type SetStateType<T> = React.Dispatch<React.SetStateAction<T>>;

export type ScreenContextType = {
  windowHeight: number;
  windowWidth: number;
  isPortrait: boolean;
  windowScale: number;
  windowFontScale: number;
  isTypeTablet: boolean;
};

export type NewCommentDetailsType = {
  postId: undefined | string;
  userId: undefined | string;
  body: string;
};
export type UpdatingCommentDetailsType = {
  id: number | undefined;
  editedBody: string;
};

export type CommentItemType = {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: {
    id: number;
    username: string;
    fullName: string;
  };
};
