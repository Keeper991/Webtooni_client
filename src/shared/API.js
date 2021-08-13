import axios from "axios";
import { getToken } from "./PermitAuth";

const getKakaoAddr = () => {
  const redirectURI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://webtooniverse-host.s3-website.ap-northeast-2.amazonaws.com";
  return `https://kauth.kakao.com/oauth/authorize?client_id=9bf8aff1cb1460ec63268cd09c603a1a&redirect_uri=${redirectURI}/user/kakao&response_type=code`;
};

const getNaverAddr = () => {
  const redirectURI =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "http://webtooniverse-host.s3-website.ap-northeast-2.amazonaws.com";
  return `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=....&redirect_uri=${redirectURI}&state=....`;
};

const instance = axios.create({
  baseURL: "http://13.124.236.225/api/v1/",
});

// 매 요청 전에 token 유무를 확인해서 header에 Authorization 추가.
instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.common["Authorization"] = `${token}`;
  return config;
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
  getOrderByCreatedAt: (pageNumber) =>
    instance.get(`reviews/new`, { params: { page: pageNumber, size: 10 } }),
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
  getPage: (pageNumber) =>
    instance.get(`talk`, { params: { page: pageNumber, size: 10 } }),
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
  getComment: () => instance.get(`user/me/comment`),
  getReviews: () => instance.get(`user/me/reviews`),
  getLevel: () => instance.get(`user/me/level`),
  getInfo: () => instance.get(`user/info`),
  putUserInfo: ({ userName, userImg }) =>
    instance.put(`user/me`, { userName, userImg }),
  kakaoLoginCallback: (code) =>
    instance.get(`user/kakao/callback`, { params: { code } }),
  naverLoginCallback: () => instance.get(`user/naver/callback`),
  search: (keyword) => instance.get(`search`, { params: { keyword } }),
};

export {
  webtoonAPI,
  reviewAPI,
  reviewerAPI,
  offerAPI,
  talkAPI,
  userAPI,
  getKakaoAddr,
  getNaverAddr,
};
