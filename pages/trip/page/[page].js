import Layout from "@/components/Layout";
import PageHeaderBlock from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import Post from "@/components/Post";
import postConfig from "@/config/site.config.json";
import { getBoats } from "@/libs/getBoats";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import path from "path";

export default function Trip({ boats, posts, currentPage, numberOfPages }) {
  return (
    <Layout metaTitle="All Posts">
      <PageHeaderBlock title="All trips" tripPage={true} />

      <div className="container">
        <div className="row gy-5 gx-4 g-xl-5">
          {posts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} boats={boats} />
            </div>
          ))}

          <Pagination currentPage={currentPage} numberOfPages={numberOfPages} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const tripDirFiles = fs.readdirSync(path.join("content/trip"));
  const numberOfPages = Math.ceil(tripDirFiles.length / postConfig.postPerPage);

  let paths = [];

  for (let i = 1; i <= numberOfPages; i++) {
    paths.push({
      params: { page: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const tripDirFiles = fs.readdirSync(path.join("content/trip"));
  const trips = tripDirFiles.filter((f) => f.includes(".md"));

  const returnDirFiles = getPosts();

  const page = parseInt(params && params.page) || 1;
  const numberOfPages = Math.ceil(trips.length / postConfig.postPerPage);
  const pageIndex = page - 1;
  const orderedTrips = returnDirFiles.slice(
    pageIndex * postConfig.postPerPage,
    (pageIndex + 1) * postConfig.postPerPage
  );

  return {
    props: {
      boats: getBoats(),
      posts: orderedTrips,
      currentPage: page,
      numberOfPages,
    },
  };
}
