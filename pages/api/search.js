/* eslint-disable import/no-anonymous-default-export */
import fs from "fs";
import matter from "gray-matter";
import path from "path";

export default (req, res) => {
  let posts;

  if (process.env.NODE_ENV === "production") {
    // Fetch cache data
    posts = require("../../cache/data").posts;
  } else {
    const tripDirFiles = fs.readdirSync(path.join("content/trip"));
    const trips = tripDirFiles.filter((f) => f.includes(".md"));

    posts = trips.map((filename) => {
      const slug = filename.replace(".md", "");
      const dirFileContents = fs.readFileSync(
        path.join("content/trip", filename),
        "utf8"
      );

      const { data: frontMatter } = matter(dirFileContents);

      return {
        slug,
        frontMatter,
      };
    });
  }

  res.status(200).json(JSON.stringify(posts));
};
