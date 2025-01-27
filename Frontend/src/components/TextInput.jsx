/* eslint-disable react/prop-types */
import { CloseRounded, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

const TextInput = ({
  label,
  placeholder,
  name,
  value,
  error,
  handelChange,
//   textArea,
  rows,
//   columns,
  chipableInput,
  chipableArray,
  removeChip,
  height,
  small,
  popup,
  password,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col ${small ? "gap-1.5" : "gap-3"}`}>
      <label
        className={`text-xs px-1 ${
          error ? "text-red-500" : popup ? "text-gray-500" : "text-primary"
        } ${small ? "text-[8px]" : ""}`}
      >
        {label}
      </label>

      <div
        className={`rounded-lg border-2 flex items-center gap-3 p-4 
        ${error ? "border-red-500" : "border-gray-400"}
        ${chipableInput ? `flex-col items-start gap-2 bg-gray-100 ${height}` : ""}
        ${small ? "rounded-md py-2 px-3" : ""}
        ${popup ? "border-gray-400/60 text-gray-500" : "text-primary"}`}
      >
        {chipableInput ? (
          <div className="flex flex-wrap gap-1.5">
            {chipableArray.map((chip, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 p-1.5 rounded-lg bg-primary/10 text-primary text-xs cursor-pointer"
              >
                <span>{chip}</span>
                <CloseRounded
                  sx={{ fontSize: "14px" }}
                  onClick={() => removeChip(name, index)}
                />
              </div>
            ))}
            <input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
              className="w-full text-sm bg-transparent outline-none"
            />
          </div>
        ) : (
          <>
            <input
              placeholder={placeholder}
              name={name}
              value={value}
              onChange={(e) => handelChange(e)}
              rows={rows}
            //   columns={columns}
              className="w-full text-sm bg-transparent outline-none"
              type={password && !showPassword ? "password" : "text"}
            //   as={textArea ? "textarea" : "input"}
            />
            {password && (
              <>
                {showPassword ? (
                  <Visibility
                    onClick={() => setShowPassword(false)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOff
                    onClick={() => setShowPassword(true)}
                    className="cursor-pointer"
                  />
                )}
              </>
            )}
          </>
        )}
      </div>

      {error && (
        <p className={`text-xs px-1 ${small ? "text-[8px]" : ""} text-red-500`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
