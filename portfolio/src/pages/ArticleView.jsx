import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import axios from "axios";

const ArticleView = () => {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/article/${slug}`
      );

      setArticle(data.article);
    } catch (error) {
      console.log(error);
    }
  };

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-4xl font-bold">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <section className="min-h-screen py-20 px-5">
      <div className="max-w-4xl mx-auto">
        {/* IMAGE */}
        <img
          src={article.coverImage?.url}
          alt={article.title}
          className="w-full rounded-3xl mb-10"
        />

        {/* CATEGORY */}
        <span
          className="
            px-4
            py-2
            rounded-full
            bg-cyan-500/20
            text-cyan-300
            border
            border-cyan-400/20
            text-sm
            font-bold
          "
        >
          {article.category}
        </span>

        {/* TITLE */}
        <h1 className="text-5xl font-black mt-6 leading-tight">
          {article.title}
        </h1>

        {/* EXCERPT */}
        <p className="text-xl text-gray-400 mt-6">
          {article.excerpt}
        </p>

        {/* CONTENT */}
        <div
          className="
            prose
            prose-invert
            max-w-none
            mt-14
          "
        >
          <ReactMarkdown>
            {article.content}
          </ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default ArticleView;