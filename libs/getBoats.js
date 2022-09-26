import fs from "fs";
import matter from "gray-matter";
import path from "path";

const boatDirFiles = fs.readdirSync(path.join("content/boat"));
const boats = boatDirFiles.filter((f) => f.includes(".md"));

export function getBoats() {
  const returnDirFiles = boats.map((filename) => {
    const boatSlug = filename.replace(".md", "");
    const dirFileContents = fs.readFileSync(
      path.join("content/boat", filename),
      "utf-8"
    );
    const { data: boatFrontMatter, content } = matter(dirFileContents);

    return {
      boatSlug,
      boatFrontMatter,
      boatContent: content,
    };
  });
  return returnDirFiles;
}
