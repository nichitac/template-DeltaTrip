import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getBoats } from "@/libs/getBoats";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import matter from "gray-matter";
import { marked } from "marked";
import Image from "next/image";
import path from "path";

export default function BoatSingle({
  content,
  frontMatter: { title, image },
  boats,
  posts,
}) {
  const allBoat = posts.map((boat) => boat.frontMatter.boat);
  const postCount = [];
  allBoat.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout>
      <section className="page-header section-sm">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <div className="row g-4 g-lg-5 text-center text-lg-start justify-content-center justify-content-lg-start">
                <div className="col-lg-3 col-md-4 col-sm-5 col-6">
                  <Image
                    className="rounded"
                    src={image}
                    alt={title}
                    width={`250`}
                    height={`250`}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={image}
                  />
                </div>
                <div className="col-lg-9 col-md-12">
                  <p className="mb-2">
                    <span className="fw-bold text-black">
                      {postCount[title] < 9
                        ? `0${postCount[title]}`
                        : postCount[title]}
                    </span>{" "}
                    Published posts
                  </p>
                  <h1 className="h3 text-dark mb-3">{title}</h1>
                  <div className="content">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: marked.parse(content),
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) =>
            post.frontMatter.boat === title ? (
              <div key={i} className="col-lg-6">
                <Post post={post} boats={boats} />
              </div>
            ) : null
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const boatDirFiles = fs.readdirSync(path.join("content/boat"));
  const boats = boatDirFiles.filter((f) => f.includes(".md"));

  const paths = boats.map((filename) => ({
    params: {
      boat_slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { boat_slug } }) {
  const fileContents = fs.readFileSync(
    path.join("content/boat", boat_slug + ".md"),
    "utf8"
  );

  const { data: frontMatter, content } = matter(fileContents);

  return {
    props: {
      boat_slug,
      frontMatter,
      content,
      boats: getBoats(),
      posts: getPosts(),
    },
  };
}
