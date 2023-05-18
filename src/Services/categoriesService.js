export function getCategory(categories, catId) {
  // console.log('categories', categories, 'catId', catId);
  var cat = {}
  categories?.map(category => {
    if (category.id == catId) {
      console.log('categories: ', category.id, 'catId: ', catId);
      cat=category;
    }
  });
  console.log('category', cat);
  return cat;
}
