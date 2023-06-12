import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/Posts/Posts";
import {
  selectIsPostLoading,
  selectIsPostPageLoaded,
  selectIsPostRejected,
  selectPostsIdsByPageIndex,
} from "../../store/entities/post/selectors";
import { fetchPost } from "../../store/entities/post/thunk/fetchPost";
import NotFoundPage from "../../components/NotFoundPage/NotFoundPage";
import { useRouter } from "next/router";

export default function PostsContainer() {
  const router = useRouter();
  const { pageIndex = 1 } = router?.query;
  // const { pageIndex = 1 } = useParams();
  // const pageIndex = 1;

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsPostLoading);
  const isRejected = useSelector(selectIsPostRejected);
  const isPostPageLoaded = useSelector((state) =>
    selectIsPostPageLoaded(state, { pageIndex })
  );

  const postIds = useSelector((state) => {
    return selectPostsIdsByPageIndex(state, { pageIndex });
  });

  useEffect(() => {
    if (!isPostPageLoaded) dispatch(fetchPost({ pageIndex }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isPostPageLoaded, pageIndex]);

  if (!postIds.length && isRejected) return <NotFoundPage />;

  return <Posts isLoading={isLoading} postIds={postIds || []} />;
}
