export default function replaceMarkdownVars(mdxContent) {
    const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_CLOUDFLARE_R2_URL || "";
  
    // 🔥 Ersetze {{IMAGE_PATH}} durch die echte URL
    return mdxContent.replace(/{IMAGE_PATH}/g, BASE_IMAGE_URL);
  }
  