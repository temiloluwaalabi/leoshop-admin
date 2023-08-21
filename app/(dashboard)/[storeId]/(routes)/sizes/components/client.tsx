'use client'

import Headings from "@/components/Headings"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { SizeColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"


interface SizesClientProps{
    data: SizeColumn[]
}

const SizesClient: React.FC<SizesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
  return (
    <>
        <div className="flex items-center justify-between">
            <Headings
                title={`Sizes (${data.length})`}
                description="Manage sizes for your store"
            />
            <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add New
            </Button>
        </div>
        <Separator/>
        <DataTable 
            columns={columns}
            data={data}
            searchKey="name"
        />
        <Headings 
            title="API"
            description="API calls for Sizes"
        />
        <Separator />
        <ApiList 
            entityName="sizes"
            entityIdName="sizeId"
        />
    </>
  )
}

export default SizesClient