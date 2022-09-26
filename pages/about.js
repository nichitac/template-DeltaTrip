import Boat from "@/components/Boat";
import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import { getBoats } from "@/libs/getBoats";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { marked } from "marked";
import Image from "next/image";

export default function About({ boats, posts, about: { frontMatter } }) {
  const allBoat = posts.map((boat) => boat.frontMatter.boat);
  const postCount = [];
  allBoat.forEach((x) => {
    postCount[x] = (postCount[x] || 0) + 1;
  });

  return (
    <Layout
      metaTitle={frontMatter.title}
      metaDescription={frontMatter.description}
    >
      <PageHeaderBlock title={frontMatter.title} />

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <h2
                className="text-dark mb-0"
                dangerouslySetInnerHTML={{
                  __html: marked.parseInline(frontMatter.intro.title),
                }}
              ></h2>
            </div>
          </div>

          <div className="py-5 my-3">
            <div className="row g-4 justify-content-center text-center">
              {frontMatter.intro.images.map((item, i) => (
                <div
                  key={i}
                  className={`${item.grid_class} image-grid-${i + 1}`}
                >
                  <Image
                    className="w-100 h-auto rounded"
                    src={item.src}
                    alt="about image"
                    width={item.width}
                    height={item.height}
                    layout="responsive"
                    placeholder="blur"
                    blurDataURL={item.src}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-10 text-center">
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: marked.parse(frontMatter.intro.description),
                }}
              ></div>
            </div>
          </div>

          {frontMatter.our_writers.enable === true ? (
            <div className="section-sm pb-0">
              <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                  <h2 className="section-title">
                    <span>Our writers</span>
                  </h2>

                  <div className="row gx-4 gy-5 gx-md-5 justify-content-center text-center">
                    {boats.map((boat, i) => (
                      <div key={i} className="col-lg-4 col-sm-6">
                        <Boat boat={boat} postCount={postCount} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      about: getSinglePage("content/about.md"),
      boats: getBoats(),
      posts: getPosts(),
    },
  };
}
