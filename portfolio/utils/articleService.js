import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-portfolio-backend-ke5j.onrender.com/api/v1/article",
  withCredentials: true,
});

export const getAllArticles = async () => {
  const { data } = await API.get("/all");
  return data.articles;
};

export const getSingleArticle = async (slug) => {
  const { data } = await API.get(`/${slug}`);
  return data.article;
};