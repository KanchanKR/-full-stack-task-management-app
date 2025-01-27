/* eslint-disable react/prop-types */
import { CircularProgress } from "@mui/material";

const Button = ({
  text,
  isLoading,
  isDisabled,
  rightIcon,
  leftIcon,
  type,
  onClick,
  flex,
  small,
  outlined,
  full,
}) => {
  const baseClasses =
    "rounded-lg text-white text-sm cursor-pointer transition-all duration-300 flex items-center justify-center gap-1.5 p-4 shadow-lg border";

  const typeClasses = type === "secondary"
    ? "bg-red-500 border-black"
    : "bg-red-500 border-red-500 shadow-primary/40";

  const disabledClasses = isDisabled || isLoading
    ? "opacity-80 cursor-not-allowed"
    : "";

  const flexClasses = flex ? "flex-1" : "";

  const smallClasses = small ? "py-2.5 px-7" : "";

  const outlinedClasses = outlined
    ? "bg-transparent text-black shadow-none border-black"
    : "bg-red-500 text-white"; // Ensure background is red and text is white for the filled button

  const fullClasses = full ? "w-full" : "";

  const mobilePaddingClasses = "sm:py-2 sm:px-3";

  return (
    <div
      onClick={() => !isDisabled && !isLoading && onClick()}
      className={`${baseClasses} ${typeClasses} ${disabledClasses} ${flexClasses} ${smallClasses} ${outlinedClasses} ${fullClasses} ${mobilePaddingClasses}`}
    >
      {isLoading && (
        <CircularProgress
          style={{ width: "18px", height: "18px", color: "inherit" }}
        />
      )}
      {leftIcon}
      {text}
      {isLoading && <> . . .</>}
      {rightIcon}
    </div>
  );
};

export default Button;
