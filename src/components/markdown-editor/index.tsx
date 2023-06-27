import { ReactMarkdown } from "react-markdown/lib/react-markdown";

export default function ToastUiEditor() {
  const str = "# 아씨발" + "## 이씨발";
  return (
    <>
      <ReactMarkdown>{str}</ReactMarkdown>
    </>
  );
}
