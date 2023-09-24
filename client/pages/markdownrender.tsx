// components/MarkdownRenderer.tsx

import React from 'react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const rawHtml = marked(content);
  const safeHtml = DOMPurify.sanitize(rawHtml);

  return <div dangerouslySetInnerHTML={{ __html: safeHtml }} />;
}

export default MarkdownRenderer;
