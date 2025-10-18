export default interface CategoryType {
  _id: string;
  title: string;
  description: string;
  slug: {
    current: string;
  };
  featured: boolean;
  image: {
    asset: {
      _ref: string;
      _type: string;
    };
    _type: string;
  };
}
