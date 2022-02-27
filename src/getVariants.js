import { getAttributes } from "./getAttributes.js";

export const getVariants = (data) => {
  const variants = [];
  let c = 1;
  while (data[`var${c}:model_no`]) {
    const tempVariant = {};
    const variant = {};
    for (let key in data) {
      if (key.startsWith(`var${c}`)) {
        const varKey = key.split(":").slice(1);
        let value = data[key];
        if (varKey[0].includes("price")) {
          value = parseFloat(value);
          //   console.log(value, "value");
        }
        if (!(varKey.length > 1)) {
          variant[varKey[0]] = value;
        }
        tempVariant[varKey.join(":")] = value;
      }
    }
    tempVariant.total_attributes = data.total_attributes;
    // console.log(tempVariant, "variant");
    variant.attributes = getAttributes(tempVariant);
    // console.log(variant, "variant");
    variants.push(variant);
    c++;
  }
  console.log(variants, "variants");
  return variants;
};
