const ImageUrl = "http://10.10.10.65:8008/api";
// export const ImageUrl = "http://10.10.10.65:8004";

export const makeImage = (url: any) => {
  if (!url) return "";

  const fullUrl = url.startsWith("http") ? url : `${ImageUrl}${url}`;

  return encodeURI(fullUrl);
};

export function formatDate(dateValue: any) {
  const date = new Date(dateValue);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

export const createFormatDate = (dateStr: any) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-indexed
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const formatTimeFromParam = (date: Date) => {
  if (!date) return "";

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // 0 => 12

  const mins = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${mins} ${ampm}`;
};
