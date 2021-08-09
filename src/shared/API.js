import axios from "axios";

const instance = axios.create({
  baseURL: "http://13.124.236.225/api/v1/",
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
  getBest: () => instance.get(`rank/reviewers`),
};

const offerAPI = {
  getSimilarGenre: (webtoonId) =>
    instance.get(`webtoon/${webtoonId}/offer/genre`),
  getBestReviewersChoice: () => instance.get(`offer/best-reviewer`),
  getSimilarUsersChoice: () => instance.get(`offer/similar-user`),
  getForUser: () => instance.get("offer/for-user"),
  getMd: () => instance.get(`offer/md`),
  getEnd: () => instance.get(`offer/end`),
};

const talkAPI = {
  getAll: () => instance.get(`talk`),
  getOne: (postId) => instance.get(`talk/${postId}`),
  getComments: (postId) => instance.get(`talk/${postId}/comment`),
  addPost: ({ postTitle, postContent }) =>
    instance.post(`talk`, { postTitle, postContent }),
  editPost: ({ postId, postTitle, postContent }) =>
    instance.put(`talk/${postId}`, { postTitle, postContent }),
  deletePost: (postId) => instance.delete(`talk/${postId}`),
  likePost: (postId) => instance.post(`talk/${postId}/like`),
  addComment: ({ postId, commentContent }) =>
    instance.post(`talk/${postId}/comment`, { commentContent }),
  editComment: ({ postId, commentpostId, commentContent }) =>
    instance.put(`talk/${postId}/comment`, { commentpostId, commentContent }),
  deleteComment: ({ postId, commentpostId }) =>
    instance.delete(`talk/${postId}/comment`, { commentpostId }),
};

const userAPI = {
  addWebtoon: (id) => instance.post(`user/me/webtoons`, { id }),
  getWebtoon: () => instance.get(`user/me/webtoons`),
  getNickname: () => instance.get(`user/me/nick`),
  getComment: () => instance.get(`user/me/comment`),
  getReviews: () => instance.get(`user/me/reviews`),
  getLevel: () => instance.get(`user/me/level`),
  putUserInfo: ({ userName, userImg }) =>
    instance.put(`user/me`, { userName, userImg }),
  register: ({ userEmail, userName, password, passwordChecker, userImg }) =>
    instance.post(`user/register`, {
      userEmail,
      userName,
      password,
      passwordChecker,
      userImg,
    }),
  login: ({ userEmail, password }) =>
    instance.post(`user/login`, { userEmail, password }),
  socialLogin: () => instance.post(`user/social/callback`),
  search: (keyword) => instance.get(`search?keyword=${keyword}`),
};

export { webtoonAPI, reviewAPI, reviewerAPI, offerAPI, talkAPI, userAPI };
