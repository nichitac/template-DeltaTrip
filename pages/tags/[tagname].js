import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '@/components/Post';
import Layout from '@/components/Layout';
import { getPosts } from '@/libs/getPosts';
import { getBoats } from '@/libs/getBoats';
import PageHeaderTaxo from '@/components/PageHeaderTaxonomy';

export default function TagSingle({ boats, posts, tag }) {
  let flatPosts = posts.flat();
  function getUniquePostsBy(flatPosts, key) {
    return [...new Map(flatPosts.map((item) => [item[key], item])).values()];
  }
  const uniquePosts = getUniquePostsBy(flatPosts, 'slug');

  return (
    <Layout
      metaTitle={`Showing posts from - ${
        tag.charAt(0).toUpperCase() + tag.slice(1).replace(/-/g, ' ')
      }`}
    >
      <div className="container">
        <PageHeaderTaxo title={tag} />

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
  const file = fs.readdirSync(path.join('content/trip'));
  const allTags = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/trip', file),
      'utf-8'
    );
    const { data: frontmatter } = matter(dirFileContents);

    return frontmatter.tags;
  });

  const flatTags = allTags.flat();
  const uniqueTags = [...new Set(flatTags)];

  const paths = uniqueTags.map((t) => ({
    params: {
      tagname: t.toString().replace(/ /g, '-').toLowerCase(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const file = fs.readdirSync(path.join('content/trip'));
  const posts = file.map((file) => {
    const dirFileContents = fs.readFileSync(
      path.join('content/trip', file),
      'utf-8'
    );
    const { data: frontMatter } = matter(dirFileContents);
    const filterFm = frontMatter.tags.filter(
      (c) => c.toLowerCase().replace(/ /g, '-') === params.tagname
    );

    const post = getPosts();
    const data = post.filter((e) => {
      return e.frontMatter.tags.some((a) => {
        return filterFm.indexOf(a) != -1;
      });
    });

    return data;
  });

  return {
    props: {
      boats: getBoats(),
      posts: posts,
      tag: params.tagname,
    },
  };
}
