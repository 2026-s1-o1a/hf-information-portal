import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getContentBySlug } from "../services/umbraco";

import ConditionTemplate from "../templates/ConditionTemplate";
import ContentTemplate from "../templates/ContentTemplate";
import VideoTemplate from "../templates/VideoTemplate";
import NewsTemplate from "../templates/NewsTemplate";

function ContentDetailPage() {
  const { slug } = useParams();

  const [content, setContent] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    getContentBySlug(slug)
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!content) {
    return <p>Content not found.</p>;
  }

  switch (content.contentType) {
    case "conditionPage":
      return (
        <ConditionTemplate content={content} />
      );

    case "contentPage":
      return (
        <ContentTemplate content={content} />
      );

    case "videoPage":
        return (
        <VideoTemplate content={content} />
    );

    case "newsPage":
      return (
        <NewsTemplate content={content} />
      );

    default:
      return <p>Unknown content type</p>;
  }
}

export default ContentDetailPage;