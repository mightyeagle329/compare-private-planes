import Cosmic from "cosmicjs";

const bucket = Cosmic().bucket({
  slug: "marketplace-production",
  read_key: "gX6q1ZzIa6jstOjFeL6rHb0XaNETWQ4gNrbwgFG9k172uFopjy",
});

export async function getAllDataByType(objectType = "categories") {
  const params = {
    query: {
      type: objectType,
    },
    props: "title,slug,id,metadata",
    sort: "-created_at",
  };

  try {
    const data = await bucket.getObjects(params);
    return data.objects;
  } catch (error) {
    return { error };
  }
}

export async function filterDataByParams({
  min,
  max,
  color,
  category,
  search,
}) {
  let queryParam = {};

  if (min.length || max.length) {
    queryParam = {
      ...queryParam,
      "metadata.price": {
        $gte: min?.length ? Number(min) : 1,
        $lte: max.length ? Number(max) : 10000000000,
      },
    };
  }

  if (color?.toLocaleLowerCase() !== "any color") {
    queryParam = { ...queryParam, "metadata.color": color };
  }

  if (typeof category !== "undefined") {
    queryParam = { ...queryParam, "metadata.categories": category };
  }

  if (search.length && typeof search !== "undefined") {
    queryParam = { ...queryParam, title: { $regex: search, $options: "i" } };
  }

  const params = {
    query: {
      ...queryParam,
      type: "products",
    },
    props: "title,slug,metadata,created_at",
  };

  try {
    const data = await bucket.getObjects(params);
    return data.objects;
  } catch (error) {
    return { error };
  }
}
