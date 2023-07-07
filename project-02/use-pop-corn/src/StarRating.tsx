import { useState } from "react";
import styles from "./star.module.css";

interface Props {
  numberStar?: number;
  color?: string;
  textColor?: string;
  starColor?: string;
  borderColor?: string;
  size?: number;
  textSize?: number;
  starSize?: number;
  textScale?: number;
  className?: string;
  message?: string[];
  defaultRating?: number;
  onGetRating?: any;
}

const StarRating = ({
  numberStar = 5,
  color = "#fcc419",
  textColor = color,
  starColor = color,
  borderColor = color,
  size = 48,
  textSize = size,
  starSize = size,
  textScale = 1.5,
  className = "",
  message = [""],
  defaultRating = 0,
  onGetRating,
}: Props) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handlerTempRating = (i) => {
    setTempRating(i + 1);
  };

  const handlerOffTempRating = () => {
    setTempRating(0);
  };

  const handlerRating = (i) => {
    setRating(i + 1);
    onGetRating(i + 1);
  };

  return (
    <div className={styles["star-rating-container"] + className}>
      <div className={styles["star-rating"]}>
        {Array.from({ length: numberStar }, (_, i) => {
          return (
            <Star
              key={i}
              onRate={() => handlerRating(i)}
              rate={tempRating ? tempRating >= i + 1 : rating >= i + 1}
              onTempRate={() => handlerTempRating(i)}
              offTempRate={() => handlerOffTempRating()}
              color={starColor}
              size={starSize}
              borderColor={borderColor}
            />
          );
        })}
      </div>
      <span
        className={styles["rating-num"]}
        style={{ color: textColor, fontSize: `${textSize / textScale}px` }}>
        {message.length === numberStar
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </span>
    </div>
  );
};

export default StarRating;

const Star = ({ onRate, rate, onTempRate, offTempRate, color, size, borderColor }) => {
  return (
    <span
      role='button'
      className={styles["star"]}
      style={{ height: `${size}px`, width: `${size}px` }}
      onClick={onRate}
      onMouseEnter={onTempRate}
      onMouseLeave={offTempRate}>
      {rate ? (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill={color}
          stroke={borderColor}>
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          stroke={borderColor}>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='{2}'
            d='M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
          />
        </svg>
      )}
    </span>
  );
};

/*
FULL STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 20 20"
  fill="#000"
  stroke="#000"
>
  <path
    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
  />
</svg>


EMPTY STAR

<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  viewBox="0 0 24 24"
  stroke="#000"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="{2}"
    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
  />
</svg>

*/
