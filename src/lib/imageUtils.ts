export const DEFAULT_FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop";

/**
 * Returns a guaranteed-valid image URL for Next.js <Image /> components.
 * Automatically normalizes Windows backslashes, "public/" prefixes, and relative paths.
 */
export function getSafeImageUrl(
  src?: string | null,
  fallback = DEFAULT_FALLBACK_IMAGE
): string {
  if (!src || typeof src !== "string") {
    return fallback;
  }

  // Convert Windows backslashes (\) to standard forward slashes (/)
  let trimmed = src.trim().replace(/\\/g, "/");
  if (!trimmed) {
    return fallback;
  }

  // Strip leading "public/" or "/public/" if user typed the file path
  if (trimmed.startsWith("public/")) {
    trimmed = "/" + trimmed.slice(7);
  } else if (trimmed.startsWith("/public/")) {
    trimmed = "/" + trimmed.slice(8);
  }

  // Local static paths (e.g., "/projectimg/uber.png" or "/images/foo.png")
  if (trimmed.startsWith("/")) {
    return trimmed;
  }

  // Data URLs
  if (trimmed.startsWith("data:image/")) {
    return trimmed;
  }

  // Absolute URLs (http:// or https://)
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      new URL(trimmed);
      return trimmed;
    } catch {
      return fallback;
    }
  }

  // Relative paths without leading slash (e.g. "projectimg/uber.png" or "preview.png")
  if (trimmed.includes(".") && !trimmed.includes("://") && !trimmed.includes(" ")) {
    return `/${trimmed}`;
  }

  return fallback;
}
