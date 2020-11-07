import { getYuQueDocs } from '../../../data-provider';

export {
  YuQueAuth
} from './auth';

export const genYuQueCommands = (token) => ([{
  name: 'yq',
  fn: (toast, cm, cmd, postManager) => {
    const {
      postListUpdater,
      loading,
      Persistor,
      active
    } = postManager;
    loading(true);
    getYuQueDocs(token)
      .then((posts) => {
        postListUpdater((oldPosts) => {
          return [
            ...posts.map(p => {
              const postId = this.genTmpId(p.title);
              const fullPost = {
                ...p,
                id: postId,
                postType: 'draft'
              };
              Persistor.set(postId, fullPost);
              return fullPost;
            }),
            ...oldPosts
          ];
        })
        active(0);
        toast.success('语雀文档加载完毕')
      })
      .catch(() => {
        toast.error('语雀文档加载出错')
      })
      .finally(() => {
        loading(false);
      })
  }
}])

