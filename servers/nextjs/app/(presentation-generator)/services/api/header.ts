const apiKey =
  typeof process.env.NEXT_PUBLIC_PRESENTON_API_KEY !== "undefined"
    ? process.env.NEXT_PUBLIC_PRESENTON_API_KEY
    : null;

/** Append API key to URL for SSE/EventSource (they cannot send headers). */
export const appendApiKeyToUrl = (url: string): string => {
  if (!apiKey) return url;
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}api_key=${encodeURIComponent(apiKey)}`;
};

export const getHeader = () => {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  return headers;
};

export const getHeaderForFormData = () => {
  const headers: Record<string, string> = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }
  return headers;
};
