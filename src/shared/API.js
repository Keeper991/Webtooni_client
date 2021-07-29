import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

const webtoonAPI = {
  getRank: () => instance.get(`rank/total`),
  getNaverRank: () => instance.get(`rank/naver`),
  getKakaoRank: () => instance.get(`rank/kakao`),
  getOne: (id) => instance.get(`webtoon/${id}`),
};

const reviewAPI = {
  getMain: () => instance.get(`rank/reviews`),
  putStar: ({ webtoonId, userPointNumber }) =>
    instance.put(`reviews/star`, { webtoonId, userPointNumber }),
  likeReview: (reviewId) => instance.post(`/reviews/${reviewId}/like`),
  putReview: ({ reviewId, reviewContent }) =>
    instance.put(`reviews/${reviewId}`, { reviewContent }),
  deleteReview: (reviewId) => instance.delete(`reviews/${reviewId}`),
  getOrderByCreatedAt: () => instance.get(`reviews/new`),
  getUnwritten: () => instance.get(`reviews/suggestion`),
};

const reviewerAPI = {
  getBest: () => instance.get(`best-reviewer`),
};

const offerAPI = {
  getSimilarGenre: (webtoonId) =>
    instance.get(`webtoon/${webtoonId}/offer/genre`),
  getBestReviewersChoice: () => instance.get(`offer/best-reviewer`),
  getSimilarUsersChoice: () => instance.get(`offer/similar-user`),
  getMd: () => instance.get(`offer/md`),
  getEnd: () => instance.get(`offer/end`),
};

const talkAPI = {
  getAll: () => instance.get(`talk`),
  getOne: (id) => instance.get(`talk/${id}`),
  getComments: (postId) => instance.get(`talk/${postId}/comment`),
  addPost: ({ postTitle, postContent }) =>
    instance.post(`talk`, { postTitle, postContent }),
  editPost: ({ id, postTitle, postContent }) =>
    instance.put(`talk/${id}`, { postTitle, postContent }),
  deletePost: (id) => instance.delete(`talk/${id}`),
  likePost: (id) => instance.post(`talk/${id}/like`),
  addComment: ({ id, commentContent }) =>
    instance.post(`talk/${id}/comment`, { commentContent }),
  editComment: ({ id, commentId, commentContent }) =>
    instance.post(`talk/${id}/comment`, { commentId, commentContent }),
  deleteComment: ({ id, commentId }) =>
    instance.post(`talk/${id}/comment`, { commentId }),
};

const meAPI = {
  addWebtoon: (id) => instance.post(`user/me/webtoons`, { id }),
  getWebtoon: () => instance.get(`user/me/webtoons`),
  getNickname: () => instance.get(`user/me/nick`),
  getComment: () => instance.get(`user/me/comment`),
  getReviews: () => instance.get(`user/me/reviews`),
  getLevel: () => instance.get(`user/me/level`),
  putUserInfo: ({ userName, userImg }) =>
    instance.put(`user/me`, { userName, userImg }),
  register: ({ userId, userName, password, userImg }) =>
    instance.post(`user/register`, { userId, userName, password, userImg }),
  login: ({ userId, password }) =>
    instance.post(`user/login`, { userId, password }),
  socialLogin: () => instance.post(`user/social/callback`),
  search: (keyword) => instance.get(`search?keyword=${keyword}`),
};

export { webtoonAPI, reviewAPI, reviewerAPI, offerAPI, talkAPI, meAPI };
