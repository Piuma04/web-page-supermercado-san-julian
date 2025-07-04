import { Suspense } from "react";
import ProductContentSkeleton from "@/app/components/ProductContentSkeleton";
import ProductContent from "@/app/components/ProductContent";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;

    return (
        <Suspense fallback={<ProductContentSkeleton />}>
            <ProductContent id={id} />
        </Suspense>
    );
}