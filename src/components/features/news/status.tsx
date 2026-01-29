import { Check, Clock } from "lucide-react";
import clsx from "clsx";

export default function NewsStatus({
  status,
}: {
  status: "draft" | "published";
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2 py-1 text-xs",
        {
          "bg-gray-100 text-gray-500": status === "draft",
          "bg-green-500 text-white": status === "published",
        },
      )}
    >
      {status === "draft" ? (
        <>
          Draft
          <Clock className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === "published" ? (
        <>
          Published
          <Check className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
