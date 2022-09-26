import { sortByDate } from "@/utils/sortByDate";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const tripDirFiles = fs.readdirSync(path.join("content/trip"));
const trips = tripDirFiles.filter((f) => f.includes(".md"));

export function getPosts() {
  const returnDirFiles = trips.map((filename) => {
    const slug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/trip", filename),
      "utf8"
    );

    const { data: frontMatter, content } = matter(dirFileContents);

    return {
      slug,
      frontMatter,
      content,
    };
  });
  return returnDirFiles.sort(sortByDate);
}
