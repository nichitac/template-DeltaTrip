import Layout from "@/components/Layout";
import PageHeaderTaxo from "@/components/PageHeaderTaxonomy";
import Post from "@/components/Post";
import { getBoats } from "@/libs/getBoats";
import { getPosts } from "@/libs/getPosts";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default function TagSingle({ boats, posts, category }) {
  let flatPosts = posts.flat();
  function getUniquePostsBy(flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  }
  const uniquePosts = getUniquePostsBy(flatPosts, "slug");

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " ")
      }`}
    >
      <div className="container">
        <PageHeaderTaxo title={category} />

        <div className="row gy-5 gx-4 g-xl-5">
          {uniquePosts.map((post, i) => (
            <div key={i} className="col-lg-6">
              <Post post={post} boats={boats} />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const file = fs.readdirSync(path.join("content/trip"));
  const allCategories = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join("content/trip", file),
      "utf-8"
    );
    const { data: frontmatter } = matter(dirFileContents);

    return frontmatter.categories;
  });

  const flatCategories = allCategories.flat();
  const uniqueCategories = [...new Set(flatCategories)];

  const paths = uniqueCategories.map((t) => ({
    params: {
      categoriesname: t.toString().replace(/ /g, "-").toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const file = fs.readdirSync(path.join("content/trip"));
  const posts = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join("content/trip", file),
      "utf-8"
    );
    const { data: frontMatter } = matter(dirFileContents);
    const filterFm = frontMatter.categories.filter(
      (c) => c.toLowerCase().replace(/ /g, "-") === params.categoriesname
    );

    const post = getPosts();
    const data = post.filter((e) => {
      return e.frontMatter.categories.some((a) => {
        return filterFm.indexOf(a) != -1;
      });
    });

    return data;
  });

  return {
    props: {
      boats: getBoats(),
      posts: posts,
      category: params.categoriesname,
    },
  };
}
