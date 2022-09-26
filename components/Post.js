import { formatDate } from "@/utils/formatDate";
import { readingTime } from "@/utils/readingTime";
import { truncateString } from "@/utils/truncateString";
import { IconCalendarEvent, IconClock } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

export default function Post({
  post: {
    slug,
    content,
    frontMatter: { title, image, date, boat, description, tags },
  },
  boats,
}) {
  return (
    <>
      <article className="card post-card h-100 border-0 bg-transparent">
        <div className="card-body">
          <Link href={`/trip/${slug}`}>
            <a className="d-block" title={title}>
              <div className="post-image position-relative">
                <Image
                  className="rounded"
                  src={image}
                  alt={title}
                  width={`790`}
                  height={`500`}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={image}
                />
              </div>
            </a>
          </Link>

          <ul className="card-meta list-inline mb-3">
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconCalendarEvent size={18} />
              </i>
              <span>{formatDate(date)}</span>
            </li>
            <li className="list-inline-item mt-2">—</li>
            <li className="list-inline-item mt-2">
              <i className="me-2">
                <IconClock size={18} />
              </i>
              <span>{readingTime(content)} min read</span>
            </li>
          </ul>

          <Link href={`/trip/${slug}`}>
            <a className="d-block" title={title}>
              <h3 className="post-title mb-3">{title}</h3>
            </a>
          </Link>
          <p>{truncateString(description, 150)}</p>
        </div>
        <div className="card-footer border-top-0 bg-transparent p-0">
          <ul className="card-meta list-inline">
            <li className="list-inline-item mt-2">
              <Link href={`/boat/${boat.replace(/ /g, "-").toLowerCase()}`}>
                <a
                  className="card-meta-boat"
                  title={`Read all posts by - ${boat}`}
                >
                  {boats.map((boatPage, i) =>
                    boat.replace(/ /g, "-").toLowerCase() ===
                    boatPage.boatSlug ? (
                      <span key={i}>
                        <Image
                          src={boatPage.boatFrontMatter.image}
                          alt={boat}
                          width="26"
                          height="26"
                          layout="fixed"
                        />
                      </span>
                    ) : (
                      ""
                    )
                  )}
                  <i className="d-inline-block ms-2 ps-1 fst-normal">
                    by <span>{boat.split(" ")[0]}</span>
                  </i>
                </a>
              </Link>
            </li>
            <li className="list-inline-item mt-2">•</li>
            <li className="list-inline-item mt-2">
              <ul className="card-meta-tag list-inline">
                {tags.map((t, i) => (
                  <li key={i} className="list-inline-item small">
                    <Link href={`/tags/${t.replace(/ /g, "-").toLowerCase()}`}>
                      <a>{t}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </article>
    </>
  );
}
