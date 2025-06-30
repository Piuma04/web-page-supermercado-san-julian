import { Suspense } from "react";
import ProductContentSkeleton from "@/app/components/ProductContentSkeleton";
import ProductContent from "@/app/components/ProductContent";

export default async function ProductDetailPage({ params }: { params: { id: string } }) {
    const { id } = await params;

    return (
        <Suspense fallback={<ProductContentSkeleton />}>
            <ProductContent id={id} />
        </Suspense>
    );
}