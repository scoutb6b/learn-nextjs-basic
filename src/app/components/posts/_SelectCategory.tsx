// "use client";

// import { Category } from "@/app/_types/request/category";
// import { useEffect, useState } from "react";

// const SelectCategory = ({ setCategories, categories }) => {
//   const [category, setCategory] = useState<Category[]>([]);
//   useEffect(() => {
//     const categoryData = async () => {
//       try {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}admin/categories`
//         );
//         const { categories } = await res.json();
//         setCategory(categories);
//       } catch (error) {
//         console.error("GET error");
//       }
//     };
//     categoryData();
//   }, []);
//   return (
//     <div>
//       <select
//         className="border-2 border-gray-500 rounded-md w-full p-2"
//         value={categories.length > 0 ? categories[0].id : ""}
//         onChange={(e) => setCategories({ id: parseInt(e.target.value) })}
//       >
//         <option value=""></option>
//         {category.map((item) => {
//           return (
//             <option value={item.id} key={item.id}>
//               {item.name}
//             </option>
//           );
//         })}
//       </select>
//     </div>
//   );
// };

// export default SelectCategory;
