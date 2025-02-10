import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts, className, authors }) => {
  const { summary_length } = config.settings;

  return (
    <div className={`row space-y-16 ${className}`}>
      {posts.map((post, i) => (
        <div
          key={`key-${i}`}
          className={`group flex flex-col h-full ${i === 0 ? "col-12" : "col-12 sm:col-6"}`}
        >
          <Link href={`/tiny-house/${post.slug}`} legacyBehavior className="block h-full">
            {/* Gesamtbox mit flex-grow für gleiche Höhe */}
            <div className="flex flex-col h-full transition-all">
              {/* Bild bleibt innerhalb der Box und zoomt nur intern */}
              {post.frontmatter.image && (
                <div className="overflow-hidden rounded-t-lg">
                  <Image
                    className="rounded-t-lg transform transition-transform duration-300 ease-in-out group-hover:scale-105 w-full"
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    width={i === 0 ? 925 : 445}
                    height={i === 0 ? 475 : 230}
                    priority={i === 0 ? true : false}
                  />
                </div>
              )}

              {/* Text-Container mit flex-grow für gleichmäßige Höhe */}
              <div className="flex flex-col flex-grow justify-between p-4 ">
                <div>
                  <ul className="mb-4 flex flex-wrap items-center space-x-3 text-text">
                    <li>
                      {authors
                        .filter((author) =>
                          post.frontmatter.authors
                            .map((author) => slugify(author))
                            .includes(slugify(author.frontmatter.title))
                        )
                        .map((author, i) => (
                          <Link
                            href={`/authors/${slugify(author.frontmatter.title)}`}
                            key={`author-${i}`}
                            className="flex items-center hover:text-primary"
                          >
                            {author.frontmatter.image && (
                              <Image
                                src={author.frontmatter.image}
                                alt={author.frontmatter.title}
                                height={50}
                                width={50}
                                className="mr-2 h-6 w-6 rounded-full"
                              />
                            )}
                            <span>{author.frontmatter.title}</span>
                          </Link>
                        ))}
                    </li>
                    <li>{dateFormat(post.frontmatter.date)}</li>
                    <li>
                      <ul>
                        {post.frontmatter.categories.map((category, i) => (
                          <li className="inline-block" key={`category-${i}`}>
                            <Link
                              href={`/categories/${slugify(category)}`}
                              className="mr-3 hover:text-primary"
                            >
                              &#9635; {humanize(category)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                  <h3 className="mb-2">
                    <Link href={`/tiny-house/${post.slug}`} className="block hover:text-primary">
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="text-text">
                    {post.frontmatter.description || "Keine Beschreibung verfügbar"}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Posts;
