import BannerBlock from "@/components/Banner";
import Layout from "@/components/Layout";
import Post from "@/components/Post";
import { getBoats } from "@/libs/getBoats";
import { getPosts } from "@/libs/getPosts";
import { getSinglePage } from "@/libs/getSinglePage";
import { IconNewSection } from "@tabler/icons";
import Link from "next/link";

export default function Home({ boats, posts, banner }) {
  return (
    <Layout>
      <BannerBlock banner={banner} />

      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h2 className="section-title">
              <span>Recent posts</span>
            </h2>
          </div>
        </div>
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} boats={boats} />
            </div>
          ))}

          <div className="col-12 text-center">
            <Link href={`/trip`}>
              <a className="btn btn-primary mt-5" aria-label="View all posts">
                <i className="me-2">
                  <IconNewSection size={16} />
                </i>
                View all posts
              </a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      boats: getBoats(),
      posts: getPosts().slice(0, 6),
      banner: getSinglePage("content/_index.md"),
    },
  };
}
