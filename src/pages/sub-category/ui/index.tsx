import { useParams } from 'react-router-dom';

import { GoodsListFallback, useGetCatalogData } from '@/entities/catalog';

import { Link, Loader } from '@/shared/ui';

/** Страница подкатегории товаров от партнера */
const SubCategoryPage = () => {
  const { categoryId } = useParams();

  const { categories, isLoading, isData, error } = useGetCatalogData();

  const categoryName =
    categories.find((el) => String(el.id) === String(categoryId))?.name || '';

  const subCategories =
    categories.filter((el) => String(el.parentId) === String(categoryId)) || [];

  if (!isData) return <GoodsListFallback />;

  return (
    <>
      <h2>{categoryName}</h2>

      {isLoading && !isData && !error ? (
        <Loader />
      ) : (
        <ul>
          {subCategories.map((el) => (
            <li key={el.id}>
              <Link to={String(el.id)}>{el.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SubCategoryPage;
