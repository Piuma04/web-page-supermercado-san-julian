

import {  fetchCategories } from '@/app/lib/data';

import CreateProductForm from '@/app/components/admin/CreateProductForm';

export default async function AddProductPage() {

  const categories = await fetchCategories(); 


  const simpleCategories = categories.map(({ id, name }) => ({ id, name }));

  return (
    <CreateProductForm categories={simpleCategories} />
  );
}
