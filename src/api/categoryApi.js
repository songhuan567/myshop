import ajax from './index'

// 1)添加分类
export const addCategory = (category)=> ajax('/manager/api/auth/category/add_category', category, 'post');

// 2)获取分类列表
export const getCategory = (parent_id, page_num, page_size)=> ajax('/manager/api/auth/category/get_category', {parent_id, page_num, page_size}, 'post');

// 3)删除分类
export const delCategory = (id)=> ajax('/manager/api/auth/category/del_category', {id}, 'post');

// 4)更新分类
export const updateCategory = (category)=> ajax('/manager/api/auth/category/update_category', category, 'post');

// 5)根据id获取一条分类
export const getCategoryId = (id)=> ajax('/manager/api/auth/category/get_category_by_id', {id}, 'post');

// 6)获取带有二级分类的分类列表
export const getCategoryWithChildren = ()=> ajax('/manager/api/auth/category/get_category_with_children');

