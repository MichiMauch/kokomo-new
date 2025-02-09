"use client";

import { slugify } from "@lib/utils/textConverter";
import { useSearchContext } from "context/state";
import { useSearchParams } from "next/navigation";
import Posts from "./Posts";
import SeoMeta from "./SeoMeta";

const SearchResults = ({ authors }) => {
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const keyword = slugify(key || "");
  const { posts } = useSearchContext();

  console.log("Alle Posts:", posts);
  console.log("Suchbegriff:", key);
  console.log("Slugified Suchbegriff:", keyword);

  const searchResults = posts.filter((product) => {
    console.log("\nChecking Post:", product);
    console.log("Title:", product.frontmatter.title);
    console.log("Slugified Title:", slugify(product.frontmatter.title));
    
    if (!product.frontmatter.title) {
      console.warn("Warnung: Ein Post hat keinen Titel!", product);
      return false;
    }

    if (product.frontmatter.draft) {
      return !product.frontmatter.draft;
    }

    if (slugify(product.frontmatter.title).includes(keyword)) {
      console.log("✅ Treffer beim Titel!");
      return product;
    } else if (
      product.frontmatter.categories?.find((category) =>
        slugify(category).includes(keyword)
      )
    ) {
      console.log("✅ Treffer in Kategorien!");
      return product;
    } else if (
      product.frontmatter.tags?.find((tag) => slugify(tag).includes(keyword))
    ) {
      console.log("✅ Treffer in Tags!");
      return product;
    } else if (product.content && slugify(product.content).includes(keyword)) {
      console.log("✅ Treffer im Inhalt!");
      return product;
    }
    console.log("❌ Kein Treffer!");
  });

  console.log("Gefundene Ergebnisse:", searchResults);

  return (
    <>
      <SeoMeta title={`Suchresultate für ${key}`} />
      <h1 className="h2 mb-8 text-center">
        Suchresultate für <span className="text-primary">{key}</span>
      </h1>
      {searchResults.length > 0 ? (
        <Posts posts={searchResults} authors={authors} />
      ) : (
        <div className="py-24 text-center text-h3 shadow">No Search Found</div>
      )}
    </>
  );
};

export default SearchResults;
