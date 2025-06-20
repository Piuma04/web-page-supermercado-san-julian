



type ProductCardProps =  {
  id:number;     
    name:string;  
    description: string;
    price: number;
    imageUrl: string;
};

export default function ProductCard({ id, name, description, price, imageUrl }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={imageUrl}
        alt={name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{name}</h3>
      <p className="text-gray-600 mt-1">${price.toFixed(2)}</p>
      <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-300">
        Add to Cart
      </button>
    </div>
  );
}