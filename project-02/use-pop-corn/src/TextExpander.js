import { useState } from "react";

const TextExpander = ({
  className = "",
  children,
  expanded = false,
  btnContent = ["show more", "show less"],
  wordShow = 10,
}) => {
  const [expand, setExpand] = useState(expanded);
  const content = expand ? children.split(" ").slice(0, wordShow).join(" ") + "..." : children;

  return (
    <div className={"container" + className}>
      <p>
        {content}{" "}
        <span>
          <button onClick={() => setExpand(!expand)}>
            {expand ? btnContent[1] : btnContent[0]}
          </button>
        </span>
      </p>
    </div>
  );
};

export default TextExpander;
