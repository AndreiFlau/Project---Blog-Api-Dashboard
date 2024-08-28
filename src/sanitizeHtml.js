import DOMPurify from "dompurify";

export default function sanitizeContent(html) {
  return DOMPurify.sanitize(html);
}
