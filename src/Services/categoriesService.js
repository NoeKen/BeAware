export function getCategory(categories, catId) {
  var cat = {}
  categories?.map(category => {
    if (category.id == catId) {
      console.log('categories: ', category.id, 'catId: ', catId);
      cat=category;
    }
  });
  return cat;
}
