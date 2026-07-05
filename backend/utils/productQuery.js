// أدوات مشتركة لاستعلامات المنتجات: الفرز والباجنيشن
const SORT_OPTIONS = {
  price: { price: 1 },        // من الأقل للأعلى
  popularity: { sold: -1 },   // الأكثر مبيعاً
};

const buildSort = (sortBy, defaultSort = { createdAt: -1 }) =>
  SORT_OPTIONS[sortBy] || defaultSort;

const buildPagination = (page = 1, limit = 4) => ({
  page: Number(page),
  limit: Number(limit),
  skip: (Number(page) - 1) * Number(limit),
});

module.exports = { buildSort, buildPagination };
