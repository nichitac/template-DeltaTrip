const fs = require("fs");
const path = require("path");
const matter = require("gray-matter");

function tripData() {
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

  return `export const posts = ${JSON.stringify(posts)}`;
}

try {
  fs.readdirSync("cache");
} catch (error) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", tripData(), function (err) {
  if (err) return console.log(err);
  console.log("Trip Posts Cache Complete");
});
