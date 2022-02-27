export const getAttributes = (data) => {
  //   console.log(data);
  const total = data.total_attributes;
  const attr = {};
  const attr_names = [];
  // set doesn't work for my case

  const attributes = {};
  for (let key in data) {
    if (key.startsWith("attr")) {
      const temp = key.split(":");
      const name = key.split(":")[1];
      if (!attributes[name]) {
        attr_names.push(name);
      }
      if (temp.length > 2) {
        attributes[name] = "Array";
      } else {
        attributes[name] = "String";
      }
    }
  }
//   console.log(attr_names, "attrnames", attributes);

  for (let i = 0; i < total; i++) {
    const key = `attr${i + 1}:${attr_names[i]}`;
    if (attributes[attr_names[i]] === "Array") {
      const arr = [];
      let c = 1;
      //   for (let j in data) {
      //     const arrayKey = `${key}:${c}`;
      //     // console.log(arrayKey, "arraykey");
      //     if (j === arrayKey) {
      //       arr.push(data[j]);
      //       c++;
      //     }
      //   }
      while (data[`${key}:${c}`]) {
        arr.push(data[`${key}:${c}`]);
        c++;
      }
      attr[attr_names[i]] = arr;
    } else {
      attr[attr_names[i]] = data[key];
    }
  }
//   console.log(attr, "final");
  return attr;
};