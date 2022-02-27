export const getTags = (data) => {
  const tags = [];
  let c = 1;
  while (data[`tag_${c}`]) {
    tags.push(data[`tag_${c}`]);
    c++;
  }
//   console.log(tags, "tags");
  return tags;
};
